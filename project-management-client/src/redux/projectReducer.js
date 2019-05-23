const initState = {
  projects: []
}


const projectReducer = (state = initState, action) => {
  switch(action.type) {
    case 'ADD_PROJECT':
      return {...state, projects: [...state.projects, action.data] }

      case 'ADD_ALL_PROJECTS':
      return {...state, projects: action.data }

      default:
      return state;

  }
}

export default projectReducer;