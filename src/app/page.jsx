import ClientGame from "../components/screens/ClientGame";

const MAX_SCREENSHOTS = 6;

async function getData() {
  try {
    const gamesResponse = await fetch("https://api.igdb.com/v4/games", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Client-ID": process.env.CLIENT_ID,
        Authorization: `Bearer ${process.env.TOKEN}`,
      },
      body: `
    fields id, name, summary, storyline, rating, genres.name, cover.url, screenshots.image_id,
           involved_companies.company.name, involved_companies.developer, involved_companies.publisher,
           first_release_date, platforms.name, game_modes.name, player_perspectives.name,
           themes.name, keywords.name, franchises.name, collection.name, external_games.category, external_games.url;
    where rating >= 85 & rating_count >= 200 & first_release_date > 946684800;
    sort follows desc;
    limit 300;
  `,
      cache: "no-store",
    });

    const games = await gamesResponse.json();
    if (!games || games.length === 0) throw new Error("Nenhum jogo encontrado");

    // Melhor seleção aleatória com peso para jogos mais populares
    const selectRandomGame = (games) => {
      // Ordenar por popularidade (follows) e criar pesos
      const sortedGames = games.sort(
        (a, b) => (b.follows || 0) - (a.follows || 0)
      );

      // Criar distribuição com peso: jogos mais populares têm mais chance
      const weights = [];
      for (let i = 0; i < sortedGames.length; i++) {
        // Peso decrescente: primeiros 50 jogos têm peso 3, próximos 100 peso 2, resto peso 1
        const weight = i < 50 ? 3 : i < 150 ? 2 : 1;
        for (let j = 0; j < weight; j++) {
          weights.push(i);
        }
      }

      const randomWeightedIndex =
        weights[Math.floor(Math.random() * weights.length)];
      return sortedGames[randomWeightedIndex];
    };

    const selectedGame = selectRandomGame(games);

    const screenshotsResponse = await fetch(
      "https://api.igdb.com/v4/screenshots",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Client-ID": process.env.CLIENT_ID,
          Authorization: `Bearer ${process.env.TOKEN}`,
        },
        body: `
        fields image_id,url,width,height;
        where game = ${selectedGame.id};
        limit 10;
      `,
        cache: "no-store",
      }
    );

    const screenshots = await screenshotsResponse.json();

    return {
      game: selectedGame,
      screenshots,
    };
  } catch (err) {
    console.error("Erro ao buscar jogo:", err);
    return {
      game: null,
      screenshots: [],
    };
  }
}

export default async function GuessGamePage() {
  const { game, screenshots } = await getData();

  if (!game || screenshots.length === 0) {
    return (
      <div className="text-white text-center mt-10">
        Erro ao carregar o jogo
      </div>
    );
  }
  console.log(game);
  // Como isso é server-side, você precisa passar isso como prop para um Client Component.
  return (
    <ClientGame
      game={game}
      screenshots={screenshots.slice(0, MAX_SCREENSHOTS)}
    />
  );
}
