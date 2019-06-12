import { get } from '../utils/net-work'

export const getMovies = async (id) => {
  return await get({ url: `/api/movies/theaters` })
}