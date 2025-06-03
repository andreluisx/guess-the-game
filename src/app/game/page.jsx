"use client";

import Image from "next/image";
import { useState } from "react";
import {
  ArrowRight,
  Trophy,
  Play,
  BarChart2,
  Heart,
  Flag,
  Lightbulb,
} from "lucide-react";
import ThemeToggle from "../../components/ThemeSwitcher";
import LinkedinButton from "../../components/LinkedinButton";

export default function GameGuess() {
  const maxTentativas = 7;
  const [tentativas, setTentativas] = useState({
    restantes: maxTentativas,
    historico: [],
    desistiu: false,
  });
  const [inputValue, setInputValue] = useState("");
  const [stats, setStats] = useState({
    partidas: 42,
    pontos: 1245,
    media: 8.7,
  });

  const handleSubmit = () => {
    if (inputValue.trim() && tentativas.restantes > 0 && !tentativas.desistiu) {
      setTentativas(prev => ({
        ...prev,
        restantes: prev.restantes - 1,
        historico: [...prev.historico, inputValue],
      }));
      setInputValue("");
    }
  };

  const surrender = () => {
    setTentativas(prev => ({
      ...prev,
      restantes: 0,
      desistiu: true,
    }));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  const renderizarCoracoes = () => {
    return Array.from({ length: maxTentativas }).map((_, i) => (
      <Heart
        key={i}
        className={`w-6 h-6 ${
          !(i >= tentativas.restantes)
            ? "text-red-500 fill-red-500"
            : "text-gray-300 dark:text-gray-600"
        }`}
      />
    ));
  };

  const tentativaAtual = maxTentativas - tentativas.restantes + 1;

  return (
    <div className="min-h-screen px-6 py-10 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Header Épico */}
      <header className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 flex items-center gap-2">
          <Trophy className="inline" /> GuessMaster Pro
        </h1>
        <div className="flex gap-4">
          <ThemeToggle />
          <LinkedinButton />
        </div>
      </header>

      {/* Conteúdo principal */}
      <main className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
        {/* Painel Esquerdo - Dados do Jogo */}
        <div className="w-full lg:w-1/3 bg-white/80 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-6 space-y-6 shadow-xl border border-gray-200/50 dark:border-gray-700/50">
          {/* Capa do jogo */}
          <div className="text-center">
            <p className="mb-3 text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Capa do jogo
            </p>
            <div className="relative aspect-[3/4] w-full max-w-[200px] mx-auto rounded-xl overflow-hidden border-2 border-gray-300/50 dark:border-gray-600/50 shadow-md">
              <Image
                src="/images/capa.png"
                alt="Capa do jogo"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Progresso das tentativas */}
          <div className="text-center">
            <div className="flex justify-center gap-2 mb-3">
              {renderizarCoracoes()}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {tentativas.restantes} tentativas restantes
              {tentativas.desistiu && " (Desistiu)"}
            </p>
          </div>

          {/* Dicas */}
          <div>
            <p className="mb-3 text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center justify-center gap-2">
              <Lightbulb size={16} /> Dicas estratégicas
            </p>
            <div className="grid grid-cols-2 gap-2">
              {["Ano", "Gênero", "Plataforma", "Estúdio"].map((dica, i) => (
                <button
                  key={i}
                  disabled={tentativas.desistiu}
                  className={`px-3 py-2 text-xs rounded-lg ${
                    tentativas.desistiu
                      ? "bg-gray-100 dark:bg-gray-700 cursor-not-allowed"
                      : "bg-blue-100/70 hover:bg-blue-200/70 dark:bg-blue-900/50 dark:hover:bg-blue-800/70"
                  } transition-colors flex items-center justify-center gap-1`}
                >
                  <span className="opacity-70">{dica}</span>
                  <span className="font-bold"> -1</span>
                </button>
              ))}
            </div>
          </div>

          {/* Botão Desistir */}
          <button
            onClick={surrender}
            disabled={tentativas.desistiu || tentativas.restantes === 0}
            className={`w-full mt-6 px-4 py-2 rounded-lg ${
              tentativas.desistiu
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red-600 hover:opacity-90"
            } text-white font-medium flex items-center justify-center gap-2 transition-opacity`}
          >
            <Flag size={16} />
            {tentativas.desistiu ? "Desistido" : "Desistir"}
          </button>
        </div>

        {/* Painel Direito - Jogo Principal */}
        <div className="w-full lg:w-2/3 bg-white/80 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-6 space-y-6 shadow-xl border border-gray-200/50 dark:border-gray-700/50">
          {/* Contador de Tentativas */}
          <div className="text-center flex flex-row w-full justify-between items-center">
            <span className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 rounded-full font-semibold text-sm">
              Tentativa {tentativaAtual > maxTentativas ? maxTentativas : tentativaAtual}/{maxTentativas}
              {tentativas.desistiu && " (Desistiu)"}
            </span>
            <p className="mb-3 text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Captura do jogo
            </p>
            <div className="w-36"></div>
          </div>

          {/* Captura do jogo */}
          <div className="text-center">
            <div className="relative aspect-video w-full max-w-2xl mx-auto rounded-xl overflow-hidden border-2 border-gray-300/50 dark:border-gray-600/50 shadow-lg">
              <Image
                src="/images/example.png"
                alt="Imagem do jogo"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Input de resposta - Estilo Premium */}
          <div className="flex items-center bg-white dark:bg-gray-700 rounded-xl overflow-hidden border-2 border-gray-300/50 dark:border-gray-600/50 shadow-sm focus-within:border-blue-500 transition-all max-w-2xl mx-auto">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={
                tentativas.desistiu
                  ? "Você desistiu"
                  : tentativas.restantes === 0
                  ? "Tentativas esgotadas"
                  : "Digite o nome do jogo..."
              }
              disabled={tentativas.desistiu || tentativas.restantes === 0}
              className="flex-grow px-4 py-3 bg-transparent placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none disabled:cursor-not-allowed"
            />
            <button
              onClick={handleSubmit}
              disabled={tentativas.desistiu || tentativas.restantes === 0}
              className={`px-4 py-3 ${
                tentativas.desistiu || tentativas.restantes === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90"
              } text-white transition-opacity flex items-center gap-1`}
            >
              <ArrowRight size={20} />
              <span className="hidden sm:inline">Palpitar</span>
            </button>
          </div>

          {/* Histórico de tentativas */}
          <div>
            <p className="mb-3 text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Histórico de tentativas
            </p>
            {tentativas.historico.length > 0 ? (
              <ul className="space-y-2">
                {tentativas.historico.map((t, i) => (
                  <li
                    key={i}
                    className="px-4 py-2 bg-gray-100 dark:bg-gray-700/50 rounded-lg text-sm font-medium flex justify-between items-center"
                  >
                    <span>{t}</span>
                    <span className="text-xs opacity-70">
                      +{10 - i * 2} pts
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-gray-400 dark:text-gray-500 text-sm py-4">
                {tentativas.desistiu
                  ? "Você desistiu sem tentar"
                  : "Nenhuma tentativa ainda. Faça seu primeiro palpite!"}
              </p>
            )}
          </div>
        </div>
      </main>

      {/* Seção de Estatísticas do Jogador */}
      <section className="mt-10 bg-white/80 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-200/50 dark:border-gray-700/50 max-w-7xl mx-auto">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-gray-700 dark:text-gray-200">
          <BarChart2 className="text-blue-500" /> Estatísticas do Jogador
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Cartão de Partidas */}
          <div className="bg-blue-50/70 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-900/50">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/40 rounded-lg">
                <Play className="text-blue-600 dark:text-blue-400" size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Partidas
                </p>
                <p className="text-2xl font-bold">{stats.partidas}</p>
              </div>
            </div>
          </div>

          {/* Cartão de Pontos */}
          <div className="bg-purple-50/70 dark:bg-purple-900/20 p-4 rounded-xl border border-purple-100 dark:border-purple-900/50">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/40 rounded-lg">
                <Trophy
                  className="text-purple-600 dark:text-purple-400"
                  size={20}
                />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Pontos
                </p>
                <p className="text-2xl font-bold">{stats.pontos}</p>
              </div>
            </div>
          </div>

          {/* Cartão de Média */}
          <div className="bg-green-50/70 dark:bg-green-900/20 p-4 rounded-xl border border-green-100 dark:border-green-900/50">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 dark:bg-green-900/40 rounded-lg">
                <BarChart2
                  className="text-green-600 dark:text-green-400"
                  size={20}
                />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Média
                </p>
                <p className="text-2xl font-bold">{stats.media.toFixed(1)}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}