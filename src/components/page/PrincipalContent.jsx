import { ArrowRight, Images, Play } from "lucide-react";
import Image from "next/image";
import RenderHearts from "./RenderHearts";
import renderDifficulty from "../../utils/renderDifficulty";

export default function PrincipalContent({state, isHovered, setIsHovered, dispatch, dispatchModal}) {
  return (
    <div className="z-30 lg:w-4/6 w-full flex justify-center items-start">
      <div className="flex justify-center items-center flex-col">
        <div className="flex-shrink-0 relative overflow-hidden rounded-2xl border-3 border-slate-900">
          {!isHovered && state.imageNumber < state.images.length && (
            <div className="absolute top-4 right-5 z-30 bg-black/70 px-3 py-1 cursor-default hover:hidden rounded-4xl">
              <p
                style={{ fontFamily: "Roboto-ExtraBold" }}
                className="text-shadow-black text-shadow-lg text-lg"
              >
                {state.imageNumber + 1}/{state.images.length}
              </p>
            </div>
          )}

          {state.imageNumber < state.totalHearts ? (
            <Image
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              src={`https:${state.images[state.imageNumber].url.replace(
                "t_thumb",
                "t_original"
              )}`}
              alt={`${state.game.name} imagem`}
              width={state.images[state.imageNumber].width}
              height={state.images[state.imageNumber].height}
              className={` ${renderDifficulty(state)} rounded-2xl shadow-md`}
            />
          ) : (
            <div className="relative">
              <div
                className="w-full h-full absolute flex justify-center items-center z-30 flex-col"
                style={{ fontFamily: "Roboto" }}
              >
                {state.win ? (
                  <div className="p-1">
                    <h1 className=" text-slate-50 text-3xl text-center text-shadow-lg shadow-black">
                      Você Venceu!
                    </h1>
                    <p className="text-slate-300 text-shadow-lg text-center shadow-black">
                      Parabéns! Você conseguiu acertar qual era o jogo antes das
                      vidas acabarem.
                    </p>{" "}
                  </div>
                ) : (
                  <div className="p-1">
                    <h1 className=" text-slate-50 text-center text-3xl text-shadow-lg shadow-black">
                      Você Perdeu!
                    </h1>
                    <p className="text-slate-300 md:text-md text-sm text-center text-shadow-lg shadow-black">
                      Não foi dessa vez parceiro(a), mas você pode tentar mais
                      uma vez!
                    </p>{" "}
                    <p className="text-slate-300 md:text-md text-sm text-center text-shadow-lg shadow-black">
                      O jogo era:{" "}
                      <span className="font-bold">{state.game.name}</span>
                    </p>{" "}
                  </div>
                )}
                <div className="w-full flex justify-center items-center flex-row gap-4">
                  <button
                    onClick={() => dispatchModal({ type: "RESULT_MODAL" })}
                    className="cursor-pointer py-3 px-4 bg-blue-700 hover:bg-blue-600 rounded-md mt-3 flex flex-row gap-2"
                  >
                    <Images />
                    Resultado
                  </button>
                  <button className="cursor-pointer py-3 px-4 bg-green-700 hover:bg-green-600 rounded-md mt-3 flex flex-row gap-2">
                    Começar
                    <Play />
                  </button>
                </div>
              </div>
              <Image
                src={`https:${state.images[0].url.replace(
                  "t_thumb",
                  "t_original"
                )}`}
                alt={`${state.game.name} imagem`}
                width={state.images[0].width}
                height={state.images[0].height}
                className={`blur-sm brightness-50 custom-pixelate rounded-2xl shadow-md`}
              />
            </div>
          )}
        </div>

        <div className="flex w-full">
          <div className="w-full flex justify-center items-center min-h-12 bg-black/70 mt-2 rounded-2xl">
            <div className="w-10/12 h-fit flex flex-row flex-wrap justify-start items-center py-2 px-3 gap-1">
              {RenderHearts(state)}
            </div>
            <div className="w-2/12 lg:pr-0 pr-2 h-full flex justify-center items-center">
              <p
                style={{ fontFamily: "Roboto" }}
                className="lg:text-xl text-md text-center"
              >
                <span className="text-yellow-500">{state.points} Pts</span>
              </p>
            </div>
          </div>
        </div>
        {/* Input de Tentativa */}
        <form
          onSubmit={(e) => {
            dispatch({ type: "SUBMIT", payload: state.input });
            e.preventDefault();
          }}
          className="w-full h-12 flex justify-center items-center bg-black/50 border border-slate-800 rounded-md mt-2"
        >
          <input
            disabled={state.lose || state.win}
            style={{ fontFamily: "Roboto" }}
            value={state.input || ""}
            onChange={(e) =>
              dispatch({ type: "CHANGE_INPUT", payload: e.target.value })
            }
            type="text"
            placeholder="Digite Aqui Seu Palpite"
            className="w-full h-full text-xl outline-none rounded-2xl px-4"
          />
          <button
            disabled={state.lose || state.win}
            className={`disabled:bg-slate-500 disabled:cursor-not-allowed cursor-pointer px-4 py-3 bg-red-700 rounded-md hover:opacity-90 text-white transition-opacity flex justify-center items-center gap-2`}
          >
            <span className="hidden sm:inline">Palpitar</span>
            <ArrowRight size={20} />
          </button>
        </form>
      </div>
    </div>
  );
}
