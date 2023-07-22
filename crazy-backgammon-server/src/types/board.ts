import {ChipColor} from 'enums';

export type GameChip = {
    id: string;
    color: ChipColor;
    position: number;
}

export type Board = {
    activeParticipantId: string;
    whiteChipOwner: string;
    blackChipOwner: string;
    gameChips: GameChip[];
}