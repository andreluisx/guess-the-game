export function modalReducer(state, action){
  switch(action.type){
    case 'RESULT_MODAL':
      return {...state, resultModal: state.resultModal ? false : true}

    case 'TIP_MODAL':
      return {...state, tipModal: state.tipModal ? false : true}

    case 'SURRENDER_MODAL':
      return {...state, surrenderModal: state.surrenderModal ? false : true}

    default:
      return state
  }
}