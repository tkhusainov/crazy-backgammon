import {gameManagerController} from './controller';

export function applyRoutes(app) {
    app.get('/', (req, res) => {
        res.send('App is working');
    });

    app.post('/create-game', (req, res) => gameManagerController.createGame(req, res));
    app.post('/join', (req, res) => {
        res.send('Game joined')
    });
}