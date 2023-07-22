import {v4 as uuidv4} from 'uuid';

import {ChipColor} from 'enums';
import {Board, GameChip} from 'types';

const CHIPS_COUNT = 15;

function getInitialChips(): GameChip[] {
    const whiteChips: GameChip[] = [];
    for (let i = 0; i < CHIPS_COUNT; i++) {
        whiteChips.push({
            id: uuidv4(),
            color: ChipColor.White,
            position: 0
        });
    }

    const blackChips: GameChip[] = [];
    for (let i = 0; i< CHIPS_COUNT; i++) {
        whiteChips.push({
            id: uuidv4(),
            color: ChipColor.Black,
            position: 12
        });
    }

    return [...whiteChips, ...blackChips];
}

function getInitialBoard(): Board {
    return {
        activeParticipantId: null,
        whiteChipOwner: null,
        blackChipOwner: null,
        gameChips: getInitialChips()
    };
}

export const boardUtils = {
    getInitialBoard
};