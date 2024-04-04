import mongoose from 'mongoose';



const Schema = mongoose.Schema



const gamesAPISchema = newSchema({
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
    price: {
        type: String, 
        required: true
    }, 
    id: {
        type: String, 
        required: true
    }
})

export const GamesAPI = mongoose.model('Games API', gamesAPISchema)