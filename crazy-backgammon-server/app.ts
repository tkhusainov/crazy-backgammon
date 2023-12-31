import 'module-alias/register';

import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import mongoose from 'mongoose';

import {applyRoutes} from './src/features/game-manager';
import {startSocketServer} from './src/services';

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
    console.log(`Example app listening on port ${port}`);
});

startSocketServer(8085);