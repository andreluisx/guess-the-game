export default function renderDifficulty(state) {
  switch (state.imageNumber) {
    case 0: // Muito difícil
      return "brightness-50 blur-sm";
    case 1: // Difícil
      return "brightness-50 contrast-100 grayscale blur-[4px]"; // blur menor que sm
    case 2: // Médio
      return "brightness-75 contrast-90 grayscale blur-[3px]"; // blur ainda menor
    case 3: // Fácil
      return "brightness-90 contrast-100 blur-[2px]";
    case 4: // Fácil
      return "brightness-95 contrast-105";
    case 5: // Muito fácil
      return "brightness-100 contrast-110";
    default:
      return "";
  }
};