import mongoose from 'mongoose';

import {GameInstance} from '../types/game';

const GameSchema = new mongoose.Schema<GameInstance>({
    id: {type: String, unique: true},
    code: {type: String, unique: true},
    participants: Array
});

export const GameModel = mongoose.model<GameInstance>('Game', GameSchema);
