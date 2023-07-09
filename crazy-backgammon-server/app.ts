import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { applyRoutes } from './game-manager/routes';
import mongoose from 'mongoose';

const app = express();
const port = 3004;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

applyRoutes(app);

void mongoose.connect('mongodb://127.0.0.1:27017/backgammon');
mongoose.connection.on('error', (err) => {
    console.error(err);
    console.log('%s MongoDB connection error. Please make sure MongoDB is running.');
    process.exit();
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})