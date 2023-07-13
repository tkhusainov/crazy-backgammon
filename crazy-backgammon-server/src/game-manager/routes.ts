import {gameManagerController} from './controller';

export function applyRoutes(app) {
    app.get('/', (req, res) => {
        res.send('App is working');
    });

    app.post('/create-game', (req, res) => gameManagerController.createGame(req, res));
    app.post('/join-game', (req, res) => gameManagerController.joinGame(req, res));
}