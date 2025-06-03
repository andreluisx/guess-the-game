export default function RenderTipsModal (tipOppened, dispatchModal) {
  return (
    <div className="fixed px-5 inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-slate-800 border border-slate-600 text-white rounded-xl shadow-xl p-6 max-w-md w-full relative">
        <button
          onClick={() => dispatchModal({ type: "TIP_MODAL" })}
          className="absolute top-2 cursor-pointer right-3 hover:text-gray-600 text-white text-xl"
        >
          &times;
        </button>
        <h2 className="text-lg text-center font-bold mb-4">
          Suas duas dicas aleatórias:
        </h2>
        <ul className="space-y-2">
          {tipOppened.map((hint, i) => (
            <li key={i}>
              <strong>{hint.label}:</strong> {hint.render()}
            </li>
          ))}
        </ul>
        <p className="mt-6 text-slate-400 text-center text-sm">
          você pode abrir essa dica mais tarde sem perder pontos.
        </p>
      </div>
    </div>
  );
};