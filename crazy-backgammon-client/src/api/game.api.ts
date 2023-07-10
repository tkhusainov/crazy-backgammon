import axios from 'axios';

import {GameOptions} from '../types/game';

async function createGame(authorName: string, options: GameOptions) {
    const res = await axios.post('http://localhost:3004/create-game', {authorName, options});
    return res.data;
}

async function joinGame(name: string, code: string) {
    const res = await axios.post('http://localhost:3004/create-game', {name, code});
    return res.data;
}

export const gameApi = {
    createGame,
    joinGame
}