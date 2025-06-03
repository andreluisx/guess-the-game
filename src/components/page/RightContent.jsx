import { Flag } from "lucide-react";

export default function RightContent({state, dispatch, setTipOppened, dispatchModal}) {
  return (
    <div className="z-30 md:w-2/6 w-full md:flex md:flex-col flex flex-col-reverse justify-start items-center gap-3 px-4">
      <div
        style={{ fontFamily: "Roboto" }}
        className="h-fit w-full text-center mt-1 md:mt-0 bg-black/80 rounded-3xl px-4 py-3 border border-slate-900"
      >
        <p className="text">Dicas [ -5 pontos ]:</p>
        <div className="flex flex-row justify-center mt-2 gap-3 flex-wrap">
          {state.tips.map((tip) => {
            return (
              <button
                key={tip.id}
                onClick={() => {
                  dispatch({ type: "TIP_CLICK", payload: tip.id });
                  setTipOppened(tip.tips);
                  dispatchModal({ type: "TIP_MODAL" });
                }}
                className={`cursor-pointer hover:bg-slate-600 md:min-h-14 md:min-w-14 min-h-10 min-w-10 flex justify-center items-center text-slate-300 ${
                  tip?.clicked ? "bg-slate-500 text-slate-400" : "bg-slate-800"
                } border border-slate-700 rounded-md`}
              >
                <p>{parseInt(tip.id)}</p>{" "}
              </button>
            );
          })}
        </div>

        <button
          disabled={state.lose || state.win}
          onClick={() => dispatchModal({ type: "SURRENDER_MODAL" })}
          className="w-full disabled:bg-slate-500 disabled:cursor-not-allowed p-2 md:p-3 mt-3 cursor-pointer hover:bg-red-600 bg-red-700 rounded-md flex flex-row gap-2 justify-center items-center"
        >
          Desistir
          <Flag size={20} />
        </button>
      </div>
      <div className="h-fit md:min-h-60 min-h-36 w-full mt-8 md:mt-0 bg-black/80 rounded-3xl p-2 border border-slate-900">
        <h3
          style={{ fontFamily: "Roboto" }}
          className="text-center text-slate-100 py-3 text-md md:text-lg"
        >
          Histórico de Respostas:
        </h3>
        {state.responsesHistory.length > 0 ? (
          state.responsesHistory.map((response, idx) => {
            return (
              <div key={idx} className="py-1 px-4">
                <p style={{ fontFamily: "Roboto" }} className="text-slate-300">
                  {idx + 1}#- {response}
                </p>
              </div>
            );
          })
        ) : (
          <p
            style={{ fontFamily: "Roboto" }}
            className="text-center md:text-md text-sm text-slate-500"
          >
            Nenhuma tentativa ainda...
          </p>
        )}
      </div>
    </div>
  );
}
