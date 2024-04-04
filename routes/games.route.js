import { Router } from 'express'; 


export const games = Router()


import {postGame, getAllGames, getGames, getGameById} from '../controllers/games.controller.js'


games.post('/', postGame)

games.get('/', getAllGames)

games.get('/async', getGames)

games.get('/id', getGameById)