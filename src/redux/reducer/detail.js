const initState = {
  movieInfo: {
    loading: false,
    error: false,
    info: {}
  },
  comments: {
    loading: false,
    error: false,
    count: 0,
    total: 0,
    start: 0,
    comments: []
  }
}

const detailReducer = (state = initState, action) => {
  switch (action.type) {
    case 'LOADING_DETAIL': {
      return Object.assign({}, state, {
        movieInfo: {
          ...state.movieInfo,
          loading: true
        }
      })
    }
    case 'LOADED_DETAIL': {
      return Object.assign({}, state, {
        movieInfo: {
          loading: false,
          error: false,
          info: { ...action.data }
        }
      })
    }
    case 'LOADED_DETAIL_ERROR': {
      return Object.assign({}, state, {
        movieInfo: {
          ...state.movieInfo,
          loading: false,
          error: true
        }
      })
    }
    case 'LOADING_COMMENTS': {
      return Object.assign({}, state, {
        comments: {
          ...state.comments,
          loading: true
        }
      })
    }
    case 'LOADED_COMMENTS': {
      let { count = 0, total = 0, start = 0, comments = [] } = action.data
      return Object.assign({}, state, {
        comments: {
          loading: false,
          error: false,
          count,
          total,
          start,
          comments
        }
      })
    }
    case 'LOADED_COMMENTS_ERROR': {
      return Object.assign({}, state, {
        comments: {
          ...state.comments,
          loading: false,
          error: true
        }
      })
    }
    default: return state
  }
}

export default detailReducer