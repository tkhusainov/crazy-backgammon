import axios from 'axios';

import {GameOptions, Participant} from '../types/game';

async function createGame(participant: Participant, options: GameOptions) {
    const res = await axios.post('http://localhost:3004/create-game', {participant, options});
    return res.data;
}

async function joinGame(participant: Participant, code: string) {
    const res = await axios.post('http://localhost:3004/join-game', {participant, code});
    return res.data;
}

export const gameApi = {
    createGame,
    joinGame
}