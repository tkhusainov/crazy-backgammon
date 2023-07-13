import {Request, Response} from 'express';

import {gameManagerService} from './service';

class GameManagerController {
    async createGame(req: Request, res: Response) {
        const {participant, options} = req.body;
        let game = await gameManagerService.createGame(options);
        game = await gameManagerService.joinGame(participant, game.code);
        return res.send(game);
    }

    async joinGame(req: Request, res: Response) {
        const {participant, code} = req.body;
        const game = await gameManagerService.joinGame(participant, code);
        return res.send(game);
    }
}

export const gameManagerController = new GameManagerController();