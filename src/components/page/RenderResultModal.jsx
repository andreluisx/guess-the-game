import { X } from "lucide-react";
import Image from "next/image";

export default function RenderResultModal( state, dispatchModal ) {
  const showConfetti = state.win;

  return (
    <div className="fixed inset-0 px-4 z-40 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      {showConfetti && (
        <div className="absolute inset-0 z-50 pointer-events-none">
          {[...Array(100)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                transform: `scale(${Math.random() * 0.5 + 0.5})`,
                animation: `fall ${Math.random() * 3 + 2}s linear infinite`,
              }}
            />
          ))}
        </div>
      )}

      <div className="bg-slate-800 border border-slate-600 text-white rounded-xl shadow-xl p-6 max-w-4xl w-full relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={() => dispatchModal({ type: "RESULT_MODAL" })}
          className="cursor-pointer absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
        >
          <X />
        </button>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Seção da capa do jogo */}
          {state.game.cover && (
            <div className="lg:w-1/3 flex justify-start items-center lg:justify-center">
              <div className="relative">
                <Image
                  src={`https:${state.game.cover.url.replace(
                    "t_thumb",
                    "t_cover_big"
                  )}`}
                  alt={`Capa de ${state.game.name}`}
                  width={264}
                  height={352}
                  className={'rounded-lg shadow-black shadow-2xl transition-transform border border-slate-800 duration-300 scale-100'}
                />
                
              </div>
            </div>
          )}

          {/* Seção de informações */}
          <div className="flex-1">
            {/* Cabeçalho com resultado */}
            <div className="mb-6">
              <h2 className="text-3xl font-bold mb-2">
                {state.win ? (
                  <span className="text-green-400">Você Acertou!</span>
                ) : (
                  <span className="text-red-400">Você Perdeu!</span>
                )}
              </h2>
              <p className="text-xl font-semibold mb-4">
                Pontuação:{" "}
                <span className="text-yellow-400">{state.points}</span>
              </p>

              <h3 className="text-2xl font-bold mb-2">{state.game.name}</h3>
              {state.game.rating && (
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-24 bg-slate-700 rounded-full h-2.5">
                    <div
                      className="bg-blue-500 h-2.5 rounded-full"
                      style={{ width: `${state.game.rating}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-slate-300">
                    {Math.round(state.game.rating)}/100 Avaliação
                  </span>
                </div>
              )}
            </div>

            {/* Informações do jogo em grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <h4 className="text-slate-400 text-sm font-semibold mb-1">
                  Lançamento
                </h4>
                <p>
                  {state.game.first_release_date
                    ? new Date(
                        state.game.first_release_date * 1000
                      ).toLocaleDateString()
                    : "Desconhecido"}
                </p>
              </div>

              <div>
                <h4 className="text-slate-400 text-sm font-semibold mb-1">
                  Gêneros
                </h4>
                <p>
                  {state.game.genres
                    ?.slice(0, 3)
                    .map((g) => g.name)
                    .join(", ") || "Indie"}
                </p>
              </div>

              <div>
                <h4 className="text-slate-400 text-sm font-semibold mb-1">
                  Modos
                </h4>
                <p>
                  {state.game.game_modes?.map((m) => m.name).join(", ") ||
                    "Single player"}
                </p>
              </div>

              <div>
                <h4 className="text-slate-400 text-sm font-semibold mb-1">
                  Perspectiva
                </h4>
                <p>
                  {state.game.player_perspectives
                    ?.map((p) => p.name)
                    .join(", ") || "Side view"}
                </p>
              </div>

              {state.game.platforms?.length > 0 && (
                <div className="sm:col-span-2">
                  <h4 className="text-slate-400 text-sm font-semibold mb-1">
                    Plataformas
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {state.game.platforms.slice(0, 5).map((platform) => (
                      <span
                        key={platform.id}
                        className="bg-slate-700 px-2 py-1 rounded text-sm"
                      >
                        {platform.name}
                      </span>
                    ))}
                    {state.game.platforms.length > 5 && (
                      <span className="bg-slate-700 px-2 py-1 rounded text-sm">
                        +{state.game.platforms.length - 5}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>

            {state.game.summary && (
              <div className="mb-6">
                <h4 className="text-slate-400 text-sm font-semibold mb-2">
                  SINOPSE
                </h4>
                <p className="text-slate-300">{state.game.summary}</p>
              </div>
            )}
          </div>
        </div>

        {/* Seção de screenshots */}
        {state.images?.length > 0 && (
          <div className="mt-8">
            <h4 className="text-slate-400 text-sm font-semibold mb-4">
              SCREENSHOTS
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {state.images.map((screenshot, index) => (
                <div key={screenshot.id} className="relative group">
                  <Image
                    src={`https:${screenshot.url.replace(
                      "t_thumb",
                      "t_screenshot_med"
                    )}`}
                    alt={`Screenshot ${index + 1} de ${state.game.name}`}
                    width={screenshot.width}
                    height={screenshot.height}
                    className="rounded-lg border border-slate-700 group-hover:border-slate-500 transition-all duration-300"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-lg transition-opacity duration-300">
                    <span className="text-white text-sm font-medium">
                      Ver imagem
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Estilos para os confetes */}
      <style jsx>{`
        @keyframes fall {
          to {
            transform: translateY(100vh) scale(0.5);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
