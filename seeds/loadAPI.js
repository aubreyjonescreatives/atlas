import axios from 'axios'; 
import { GamesAPI } from '../models/gamesAPI.js';
import mongoose from 'mongoose'; 
import * as dotenv from 'dotenv';
dotenv.config();

const JSONData = `../data/APIInfo.json`;

//const loadJSON = (path) => JSON.parse(fs.readFileSync(new URL(path, import.meta.url)));

//const gamesAPIInfo = loadJSON('../data/APIInfo.json');

const seedMongo = async () => {
    await mongoose.connect(`${process.env.DB_CONN_STRING}`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })

    const options = {
        method: 'GET', 
        url: '',
        // 'https://www.deckofcardsapi.com/api/deck/kxozasf3edqu/draw/?count=2',
        // params: {},
        // headers: {}
    }
    try {
        const response = await axios.request(options)
        console.log(response.data.cards)
        await addGames(response.data.cards)
        await mongoose.connection.close()
    } catch (error) {
        console.error(error)
    }
}


const addGame = async (oneGame) => {

    const games = new GamesAPI({
        // suit: oneGame.suit,
        // value: oneGame.value,
        // image: oneGame.image,
        // code: oneGame.code
        name: oneGame.name, 
        image_url: oneGame.image_url,
        description: oneGame.description,
        id: oneGame.id,
        button: oneGame.button,
    })
    await games.save() //save with Mongoose
    console.log(`Games added. Let's Play!`)
}

const addGames = async (gameList) => {
    for (let game of gameList) {
        console.log(game)
        await addGame(game)
    }
}

seedMongo()