import axios from 'axios'; 
import { gamesAPI } from '../models/populargame.js';
import mongoose from 'mongoose'; 
import * as dotenv from 'dotenv';
dotenv.config()


const seedMongo = async () => {
    await mongoose.connect(`${process.env.DB_CONN_STRING}`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })

    const options = {
        method: 'GET', 
        url: '',
        // params: {},
        // headers: {}
    }
    try {
        const response = await axios.request(options)
        console.log(response.data.games[0])
        await addGames(response.data.games)
        await mongoose.connection.close()
    } catch (error) {
        console.error(error)
    }
}


const addGame = async (oneGame) => {
    const games = new gamesAPI({
        name: oneGame.name, 
        image_url: oneGame.image_url,
        description: oneGame.description,
        price: oneGame.price,
        id: oneGame.id
    })
    await games.save() //save with Mongoose
    console.log(`Games added. Let's Play!`)
}

const addGames = async (gameList) => {
    for (let game of GameList) {
        console.log(game)
        await addGame(game)
    }
}

seedMongo()