import { GamesAPI } from '../models/gamesAPI.js'



export const postGame = ((req, res) => {
    const game = new GamesAPI({
        id: req.body.data.id,
        name: req.body.data.name,
        image_url: req.body.data.image_url,
        description: req.body.data.description,
        button: req.body.data.button
    })
    console.log(game)
    game.save() // save by Mongoose
    res.json(game)
})


export const getAllGames = ((req, res) => {
    GamesAPI.find()
    .then(games => {
        res.json(games)
    })
    .catch(err => console.log(err))
})

export const getGames = async (req, res) => {
    const games = await GamesAPI.find()
    if (!games) {
        return res.status(400).json({Message: `Sorry what was that request?`})
    }
    res.json(games)
}

export const getGameById = async (req, res) => {
    const gameId = req.body.gameId 
    console.log(gameId)
    try {
        const game = await GamesAPI.findById(gameId)
    if (!game) {
        return res.status(404).json({Message: 'Game Not Found'})
    }
    res.json(game)
    } catch(err) {
        res.status(400).json({Message: `Invalid ID: ${err}`})
    }
}