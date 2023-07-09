import { Request, Response } from "express";
import { gameManagerService } from "./service";

class GameManagerController {
    async createGame(req: Request, res: Response) {
        const {authorName, options} = req.body;
        const game = await gameManagerService.createGame(authorName, options);
        return res.send(game);
    }
}

export const gameManagerController = new GameManagerController();