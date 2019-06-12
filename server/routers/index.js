import express from 'express'
import { HomeController, ListController, DetailController } from '../controllers'

const router = express.Router()

router.get('/', HomeController)
router.get('/movies/:id', ListController)
router.get('/movie/:id', DetailController)

export default router