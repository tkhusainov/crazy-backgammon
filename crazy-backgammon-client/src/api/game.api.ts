import axios from 'axios';
import { GameOptions } from '../types/game';

export async function createGame(authorName: string, options: GameOptions) {
    const res = await axios.post('http://localhost:3004/create-game', {authorName, options});
    return res.data;
}