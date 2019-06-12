import Render from './render'

export default async (req, res) => {
  let content = await Render(req, res)
  res.send(content)
}