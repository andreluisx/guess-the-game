// Função para limpar e normalizar texto
const normalizeText = (text) => {
  return text
    .toLowerCase()
    .normalize('NFD') // Decompõe os caracteres acentuados
    .replace(/[\u0300-\u036f]/g, '') // Remove os diacríticos (acentos)
    .replace(/[:\-–—]/g, '') // Remove dois pontos e hífens
    .replace(/\s+/g, ' ') // Substitui múltiplos espaços por um só
    .trim();
};

// Função para extrair a parte principal do nome
const getMainGameName = (gameName) => {
  // Verifica se tem dois pontos ou números
  const colonMatch = gameName.match(/^([^:]+)/);
  const numberMatch = gameName.match(/^([^0-9]+)/);
  
  if (colonMatch && colonMatch[1].trim() !== gameName.trim()) {
    return colonMatch[1].trim(); // Retorna parte antes dos dois pontos
  }
  
  if (numberMatch && numberMatch[1].trim() !== gameName.trim()) {
    return numberMatch[1].trim(); // Retorna parte antes dos números
  }
  
  return gameName; // Retorna nome completo se não encontrar separadores
};

// Função para verificar se pelo menos 2 palavras coincidem (para nomes sem separadores)
const checkPartialMatch = (gameName, userInput) => {
  const gameWords = normalizeText(gameName).split(' ').filter(word => word.length > 2);
  const inputWords = normalizeText(userInput).split(' ').filter(word => word.length > 2);
  
  let matches = 0;
  
  gameWords.forEach(gameWord => {
    if (inputWords.some(inputWord => 
      inputWord === gameWord || 
      gameWord.includes(inputWord) || 
      inputWord.includes(gameWord)
    )) {
      matches++;
    }
  });
  
  return matches >= 2;
};

// Verificação principal
const checkGameAnswer = (gameName, userInput) => {
  const mainName = getMainGameName(gameName);
  
  // Se o nome principal é diferente do original, usa match exato no nome principal
  if (mainName !== gameName) {
    return normalizeText(mainName) === normalizeText(userInput);
  }
  
  // Se não tem separadores, usa regra das 2 palavras
  return checkPartialMatch(gameName, userInput) || normalizeText(gameName) === normalizeText(userInput);
};

export function gameReducer(state, action) {
  switch (action.type) {
    case 'CHANGE_INPUT':
      return { ...state, input: action.payload };
    case 'SUBMIT':
      if (state.input !== '' && state.hearts >= 0 && state.imageNumber < state.totalHearts) {
        
        if (checkGameAnswer(state.game.name, state.input)) {
          return { ...state, win: true, imageNumber: state.totalHearts };
        }
        
        if (state.hearts > 1) {
          return { ...state, points: Math.floor(Math.max(0, state.points - (100 / state.totalHearts))), responsesHistory: [...state.responsesHistory, action.payload], input: '', hearts: state.hearts - 1, imageNumber: state.imageNumber + 1 }
        }

        return { ...state, lose: true, points: Math.floor(Math.max(0, state.points - (100 / state.totalHearts))), responsesHistory: [...state.responsesHistory, action.payload], input: '', hearts: state.hearts - 1, imageNumber: state.imageNumber + 1 }
      }

      return state

    case 'SURRENDER':
      return { ...state, lose: true, imageNumber: state.totalHearts, hearts: 0, points: 0 }

    case 'TIP_CLICK':

      if (state.tips.some((tip) => tip.id === action.payload && tip.clicked === true)) {
        return state
      }

      if (state.points > 0 && state.win === false) {
        return {
          ...state, points: state.points - 5, tips: state.tips.map(tip =>
            tip.id === action.payload
              ? { ...tip, clicked: true }
              : tip
          )
        }
      }

      return state;

    default:
      return state;
  }
}