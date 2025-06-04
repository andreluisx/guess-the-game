"use client";
import { useEffect, useReducer, useState } from "react";

// Reducers
import { gameReducer } from "../../reducer/gameReducer";
import { modalReducer } from "../../reducer/modalReducer";

// Utils
import generateHintPairs from "../../utils/setTips";

// Para renderizar na tela
import RenderResultModal from "../page/RenderResultModal";
import RenderTipsModal from "../page/RenderTipsModal";
import RenderSurrenderModal from "../page/SurrenderModal";

// Conteudos Principais do game
import PrincipalContent from "../page/PrincipalContent";
import RightContent from "../page/RightContent";
import LeftContent from "../page/LeftContent";

const MAX_SCREENSHOTS = 6;

export default function ClientGame({ game, screenshots }) {
  //initial states
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
  //declarações de estado
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const [modals, dispatchModal] = useReducer(modalReducer, modalsStates);
  const [isHovered, setIsHovered] = useState(false);
  const [tipOppened, setTipOppened] = useState([]);

  // useEffect que verifica se o jogo acabou
  useEffect(() => {
    if ((state.win || state.lose) && !modals.resultModal) {
      dispatchModal({ type: "RESULT_MODAL" });
    }
  }, [state.win, state.lose]);

  
  return (
    <div className="bg-[url('/images/kratos.jpg')] bg-scroll sm:bg-fixed bg-cover bg-center w-full h-screen">
      {/* Div para escurecer o fundo */}
      <div className="z-20 absolute h-full w-full bg-black/80"></div>

      {/* Todos os Modais (Modal) */}
      {modals.tipModal && RenderTipsModal(tipOppened, dispatchModal)}
      {modals.surrenderModal && RenderSurrenderModal(dispatch, dispatchModal)}
      {modals.resultModal && RenderResultModal(state, dispatchModal)}

      {/* Tela inteira do site */}
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

        {/* Div que envolve o Conteudo */}
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
