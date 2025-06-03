export default function RenderSurrenderModal (dispatch, dispatchModal) {
  return (
    <div className="fixed inset-0 px-4 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-slate-800 border border-slate-600 text-white rounded-xl shadow-xl p-6 max-w-md w-full relative">
        <button
          onClick={() => dispatchModal({ type: "SURRENDER_MODAL" })}
          className="absolute top-2 cursor-pointer right-3 hover:text-gray-600 text-white text-xl"
        >
          &times;
        </button>
        <div>
          <h1 className="text-center font-bold mb-5">
            Deseja Mesmo Desistir?
          </h1>
        </div>
        <div className="flex flex-row justify-between items-center px-9 gap-5">
          <button
            className="bg-green-700 font-bold hover:bg-green-600 cursor-pointer w-1/2 rounded-md py-4"
            onClick={() => dispatchModal({ type: "SURRENDER_MODAL" })}
          >
            Não
          </button>
          <button
            className="bg-red-700 font-bold hover:bg-red-600  cursor-pointer w-1/2 rounded-md py-4"
            onClick={() => {
              dispatch({ type: "SURRENDER" });
              dispatchModal({ type: "SURRENDER_MODAL" });
            }}
          >
            Sim
          </button>
        </div>
      </div>
    </div>
  );
};