import { get } from '../../utils/net-wrok'

export const LOADING_DETAIL = 'LOADING_DETAIL'
export const LOADED_DETAIL = 'LOADED_DETAIL'
export const LOADED_DETAIL_ERROR = 'LOADED_DETAIL_ERROR'

export const LOADING_COMMENTS = 'LOADING_COMMENTS'
export const LOADED_COMMENTS = 'LOADED_COMMENTS'
export const LOADED_COMMENTS_ERROR = 'LOADED_COMMENTS_ERROR'

export const getMovieInfo = (id) => {
  return async (dispatch) => {
    dispatch({ type: LOADING_DETAIL })
    let info = await get(`/api/movie/${id}`)
    let { code, data } = info
    if (!!code) dispatch({ type: LOADED_DETAIL_ERROR })
    dispatch({ type: LOADED_DETAIL, data: data })
  }
}

export const getMovieComments = (id) => {
  return async (dispatch) => {
    dispatch({ type: LOADING_COMMENTS })
    let comments = await get(`/api/movie/${id}/comments`)
    let { code, data } = comments
    if (!!code) dispatch({ type: LOADED_COMMENTS_ERROR })
    dispatch({ type: LOADED_COMMENTS, data: data })
  }
}