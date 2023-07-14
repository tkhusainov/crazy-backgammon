import {v4 as uuidv4} from 'uuid';
import {WebSocket} from 'ws';

import {SocketEvent} from 'enums';
import {GameInstance, GameOptions, Participant, SocketMessage} from 'types';
import {makeGameCode} from 'utils';

import {GameModel} from './mongoose';

class GameManagerService {
    private socket: WebSocket;

    constructor() {
        this.socket = new WebSocket('ws://localhost:8085');
    }

    async createGame(options: GameOptions): Promise<GameInstance> {
        // TODO: check duplicates
        const code = makeGameCode(4);
        const gameModel = new GameModel({
            id: uuidv4(),
            code,
            options,
            participants: []
        });

        await gameModel.save();

        // TODO: add socket service for this functionality
        const socketMessage: SocketMessage = {
            event: SocketEvent.RoomCreated,
            roomCode: code
        };
        this.socket.send(JSON.stringify(socketMessage));

        return gameModel;
    }

    async joinGame(participant: Participant, code: string): Promise<GameInstance> {
        let game = await GameModel.findOne({code});
        if (!game) {
            throw new Error('game not found');
        }

        game.participants.push(participant);
        game = await game.save();

        const socketMessage: SocketMessage = {
            event: SocketEvent.ParticipantConnected,
            roomCode: game.code,
            data: {participant}
        };
        this.socket.send(JSON.stringify(socketMessage));

        return game;
    }
}

export const gameManagerService = new GameManagerService();