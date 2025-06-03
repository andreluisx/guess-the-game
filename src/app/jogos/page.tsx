import Image from "next/image";

export default async function ServerSideRendering() {
  try {
    // 1. Buscar um jogo aleatório famoso
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
    where rating >= 75 & rating_count >= 100 & category = 0;
    limit 500;
  `,
    });

    const games = await gamesResponse.json();
    console.log("Jogos encontrados:", games.length);

    if (!games || games.length === 0) {
      throw new Error("Nenhum jogo encontrado");
    }

    // 2. Selecionar um jogo aleatório
    const randomIndex = Math.floor(Math.random() * games.length);
    const selectedGame = games[randomIndex];
    console.log(games[randomIndex]);

    console.log("Jogo selecionado:", selectedGame.name, "ID:", selectedGame.id);

    // 3. Buscar screenshots específicas do jogo selecionado
    const screenshotsResponse = await fetch(
      "https://api.igdb.com/v4/screenshots",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Client-ID": process.env.CLIENT_ID,
          Authorization: `Bearer ${process.env.TOKEN}`,
        },
        body: `fields image_id,url,width,height;
               where game = ${selectedGame.id};
               limit 10;`,
      }
    );

    const screenshots = await screenshotsResponse.json();
    console.log(screenshots);
    console.log("Screenshots encontradas:", screenshots.length);

    return (
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Jogo Aleatório</h1>

        {/* Informações do Jogo */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Cover do jogo */}
            {selectedGame.cover?.url && (
              <div className="flex-shrink-0">
                <Image
                  src={`https:${selectedGame.cover.url.replace(
                    "t_thumb",
                    "t_cover_big"
                  )}`}
                  alt={selectedGame.name}
                  width={264}
                  height={374}
                  className="rounded-lg shadow-md"
                />
              </div>
            )}

            {/* Informações do jogo */}
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
                {selectedGame.name}
              </h2>

              {selectedGame.genres && (
                <div className="mb-3">
                  <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                    Gêneros:
                  </span>
                  <span className="text-sm text-gray-700 dark:text-gray-200 ml-1">
                    {selectedGame.genres.map((g) => g.name).join(", ")}
                  </span>
                </div>
              )}

              {selectedGame.rating && (
                <div className="mb-3">
                  <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                    Avaliação:
                  </span>
                  <span className="text-sm text-gray-700 dark:text-gray-200 ml-1">
                    {selectedGame.rating.toFixed(1)}/100
                  </span>
                </div>
              )}

              {selectedGame.summary && (
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
                    Resumo:
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {selectedGame.summary}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Screenshots */}
        {screenshots && screenshots.length > 0 && (
          <div>
            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              Screenshots
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {screenshots.map((screenshot, index) => (
                <div
                  key={screenshot.image_id || index}
                  className="relative group"
                >
                  <Image
                    src={`https://images.igdb.com/igdb/image/upload/t_screenshot_med/${screenshot.image_id}.jpg`}
                    alt={`Screenshot ${index + 1} de ${selectedGame.name}`}
                    width={640}
                    height={360}
                    className="rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 w-full h-auto"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {(!screenshots || screenshots.length === 0) && (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">
              Nenhuma screenshot disponível para este jogo.
            </p>
          </div>
        )}

        {/* Info para recarregar */}
        <div className="text-center mt-8">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Recarregue a página para escolher outro jogo aleatório
          </p>
        </div>
      </div>
    );
  } catch (err) {
    console.error("Erro ao buscar dados:", err);
    return (
      <div className="container mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Erro</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Não foi possível carregar os dados. Verifique sua conexão e tente
          novamente.
        </p>
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          Recarregue a página para tentar novamente
        </p>
      </div>
    );
  }
}
