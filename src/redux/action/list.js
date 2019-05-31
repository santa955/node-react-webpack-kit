import { get } from '../../utils/net-wrok'

export const LOADING_LIST = 'LOADING_LIST'
export const LOADED_LIST = 'LOADED_LIST'
export const LOADED_LIST_ERROR = 'LOADED_LIST_ERROR'

export const getList = () => {
  return async (dispatch) => {
    dispatch({ type: LOADING_LIST })
    let movies = await get('/api/movies/theaters')
    let { code, message, data } = movies
    if (!!code) dispatch({ type: LOADED_LIST_ERROR })
    dispatch({ type: LOADED_LIST, data: data })
  }
}