import {Board} from './board';

export type Participant = {
    id: string;
    name: string;
}

export type GameOptions = {
    isCrazy: boolean;
    // TODO: background image
}

export type GameInstance = {
    id: string;
    code: string;
    participants: Participant[];
    options: GameOptions;
    board: Board;
    history: any[]; // TODO: add type
}