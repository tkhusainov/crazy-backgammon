import { v4 as uuidv4 } from 'uuid';
import { GameInstance, GameOptions, Participant } from "../types/game";
import { GameModel } from "./mongoose";
import { makeGameCode } from '../utils/generator';

class GameManagerService {
    async createGame(authorName: Participant, options: GameOptions): Promise<GameInstance> {
        const gameModel = new GameModel({
            id: uuidv4(),
            code: makeGameCode(4),
            options,
            participants: [{id: uuidv4(), name: authorName}]
        });

        await gameModel.save();
        return gameModel;
    }
}

export const gameManagerService = new GameManagerService();