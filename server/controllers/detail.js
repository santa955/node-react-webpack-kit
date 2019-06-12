import { getMovieDetail } from '../servers/detail'
import Render from './render'

export default async (req, res) => {
  let movieId = req.params.id
  let detail = await getMovieDetail(movieId)
  let initState = { detail: { movieInfo: { info: detail.data } } }
  let content = await Render(req, res, initState)
  res.send(content)
}