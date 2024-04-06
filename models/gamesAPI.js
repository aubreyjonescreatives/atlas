import mongoose from 'mongoose';



const Schema = mongoose.Schema



const gamesAPISchema = new Schema({
    // suit: {
    //     type: String,
    //     required: true
    // },
    // value: {
    //     type: String,
    //     required: true
    // },
    // image: {
    //     type: String,
    //     required: true
    // },
    // code: {
    //     type: String,
    //     required: true
    // }
       
    name: {
        type: String, 
        required: true
    },
    image_url: {
        type: String, 
        required: true
    }, 
    description: {
        type: String, 
        required: false
    }, 
    id: {
        type: String, 
        required: true
    },
    button: {
        type: String, 
        required: true
    }
})

export const GamesAPI = mongoose.model('Games API', gamesAPISchema)