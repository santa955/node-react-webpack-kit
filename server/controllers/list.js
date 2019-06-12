import { getMovies } from '../servers/list'
import Render from './render'

export default async (req, res) => {
  let id = req.params.id
  let list = await getMovies(id)
  let initState = { movies: { ...list.data } }
  let content = await Render(req, res, initState)
  res.send(content)
}