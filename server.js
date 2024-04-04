import express from 'express'; 
import path from 'path'; 
import helmet from 'helmet';
import bodyParser from 'body-parser'; 
import morgan from 'morgan';
import { fileURLToPath } from 'url'; 
import { games } from './routes/games.route.js';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv'; 
import cors from 'cors';

dotenv.config()

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json())
app.use(helmet({ contentSecurityPolicy: false, crossOriginResourcePolicy: false, crossOriginEmbedderPolicy: false}))
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}));

// no more awful CORS

app.use(cors())

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
}));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    res.header("Access-Control-Allow-Methods", "*")
    next()
})

// client connection 

if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
	app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname + '/client/build/index.html'));
    });
}


app.use('/games', games)

app.use((req, res, next) => {
    res.status(404).send('<h1>Page Not Found</h1>')
})


const PORT = process.env.PORT || 8080


mongoose.set('strictQuery', false)

mongoose.connect(process.env.DB_CONN_STRING, {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
}).then(() => {
    app.listen(PORT, () => console.log(`Server Started: ${PORT}`)); 
 
}).catch((error) => console.log(`${error} Oops it didn't work again.`));


// basic server viewpoint test

// app.get('/', (req, res) => {
//     res.send('Hello World')
// })





// basic server connection: 

// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`)
// })