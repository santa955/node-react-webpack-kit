const initState = {
  subjects: [],
  count: 0,
  start: 0,
  total: 0,
  loading: true,
  error: false
}

const listReducer = (state = initState, action) => {
  switch (action.type) {
    case 'LOADING_LIST': {
      return Object.assign({}, state, { loading: true })
    }
    case 'LOADED_LIST': {
      return Object.assign({}, state, {
        loading: false,
        error: false,
        ...action.data
      })
    }
    case 'LOADED_LIST_ERROR': {
      return Object.assign({}, state, { error: true })
    }
    default: return state
  }
}

export default listReducer