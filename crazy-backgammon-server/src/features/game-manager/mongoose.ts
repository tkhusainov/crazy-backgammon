import mongoose from 'mongoose';

import {GameInstance} from 'types';

const GameSchema = new mongoose.Schema<GameInstance>({
    id: {type: String, unique: true},
    code: {type: String, unique: true},
    participants: Array, // TODO: add type
    board: {
        type: Object,
        properties: {
            activeParticipantId: {type: String},
            whiteChipOwner: {type: String},
            blackChipOwner: {type: String},
            gameChips: {type: Array}
        }
    }
});

export const GameModel = mongoose.model<GameInstance>('Game', GameSchema);
