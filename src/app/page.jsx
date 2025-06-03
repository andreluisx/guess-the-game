"use client";
import { screenshots } from "../fake_data/game";
import { game } from "../fake_data/game";
import { useEffect, useReducer, useState } from "react";

import generateHintPairs from "../utils/setTips";
import { gameReducer } from "../reducer/gameReducer";
import { modalReducer } from "../reducer/modalReducer";

// Para renderizar na tela
import RenderResultModal from "../components/page/RenderResultModal";
import RenderTipsModal from "../components/page/RenderTipsModal";
import RenderSurrenderModal from "../components/page/SurrenderModal";
//Conteudos Principais do game
import PrincipalContent from "../components/page/PrincipalContent";
import RightContent from "../components/page/RightContent";
import LeftContent from "../components/page/LeftContent";

const MAX_SCREENSHOTS = 6;

export default function App() {
  const initialState = {
    totalHearts: screenshots.slice(0, MAX_SCREENSHOTS).length,
    responsesHistory: [],
    input: "",
    hearts: screenshots.slice(0, MAX_SCREENSHOTS).length,
    images: screenshots.slice(0, MAX_SCREENSHOTS),
    imageNumber: 0,
    game,
    tips: generateHintPairs(game, 4),
    points: 100,
    lose: false,
    win: false,
  };
  const modalsStates = {
    tipModal: false,
    resultModal: false,
    surrenderModal: false,
  };
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const [modals, dispatchModal] = useReducer(modalReducer, modalsStates);
  const [isHovered, setIsHovered] = useState(false);
  const [tipOppened, setTipOppened] = useState([]);

  useEffect(() => {
    if ((state.win || state.lose) && !modals.resultModal) {
      dispatchModal({ type: "RESULT_MODAL" });
    }
  }, [state.win, state.lose]);

  return (
    <div className="bg-[url('/images/kratos.jpg')] bg-scroll sm:bg-fixed bg-cover bg-center w-full h-screen">
      {/* div para escurecer o fundo */}
      <div className="z-20 absolute h-full w-full bg-black/80"></div>

      {/* Todos os Modais (Modal) */}
      {modals.tipModal && RenderTipsModal(tipOppened, dispatchModal)}
      {modals.surrenderModal && RenderSurrenderModal(dispatch, dispatchModal)}
      {modals.resultModal && RenderResultModal(state, dispatchModal)}

      <div className="flex flex-col justify-center px-6 lg:px-0">
        {/* Header do site */}
        <div className="py-4 z-30 flex flex-row justify-center gap-2">
          <h1
            style={{ fontFamily: "Roboto-ExtraBold" }}
            className="text-center z-30 text-3xl"
          >
            <span className="text-red-700">GUESS</span> the{" "}
            <span className="text-red-700">GAME</span>{" "}
          </h1>
        </div>
        {/* div que envolve tudo */}
        <div className="flex md:flex-row flex-col">
          {/* Conteúdo da esquerda / invisivel no celular */}
          <LeftContent/>

          {/* Conteúdo central / Primeiro (celular) */}
          <PrincipalContent state={state} isHovered={isHovered} setIsHovered={setIsHovered} dispatch={dispatch} dispatchModal={dispatchModal}/>
          
          {/* Conteúdo direita / Ultimo (celular) */}
          <RightContent state={state} dispatch={dispatch} setTipOppened={setTipOppened} dispatchModal={dispatchModal} />
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  try {
    // 1. Buscar jogos famosos
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
    if (!games || games.length === 0) throw new Error("Nenhum jogo encontrado");

    // 2. Selecionar aleatoriamente
    const randomIndex = Math.floor(Math.random() * games.length);
    const selectedGame = games[randomIndex];

    // 3. Buscar screenshots específicas
    const screenshotsResponse = await fetch("https://api.igdb.com/v4/screenshots", {
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
    });

    const screenshots = await screenshotsResponse.json();

    return {
      props: {
        game: selectedGame,
        screenshots,
        timestamp: Date.now(),
      },
    };
  } catch (err) {
    console.error("Erro ao buscar jogo:", err);
    return {
      props: {
        game: null,
        screenshots: [],
        timestamp: Date.now(),
      },
    };
  }
}
