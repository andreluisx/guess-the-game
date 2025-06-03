
//  const initialState = {
//    totalHearts: screenshots.slice(0, MAX_SCREENSHOTS).length,
//    responsesHistory: ['League of Legends', 'Zelda', 'Batman Arkhan City'],
//    input: '',
//    hearts: screenshots.slice(0, MAX_SCREENSHOTS).length,
//    images: screenshots.slice(0, MAX_SCREENSHOTS),
//    game,
//    tips: {}
//  }

export function gameReducer(state, action) {
  switch (action.type) {
    case 'CHANGE_INPUT':
      return { ...state, input: action.payload };
    case 'SUBMIT':
      if (state.input !== '' && state.hearts >= 0 && state.imageNumber < state.totalHearts) {
        
        if (state.game.name.toLowerCase().trim().replace(' ', '') === state.input.toLowerCase().trim().replace(' ', '')) {
          return { ...state, win: true, imageNumber: state.totalHearts }
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


    default:
      return state;
  }
}
