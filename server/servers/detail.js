import { get } from '../utils/net-work'

export const getMovieDetail = async (movieId) => {
  return await get({ url: `/api/movie/${movieId}` })
}