import {GameInstance, Participant} from 'types/game';

function addParticipant(game: GameInstance, participant: Participant) {
    if (game.participants.length >= 2) {
        throw new Error('game is full');
    }

    game.participants.push(participant);

    if (!game.board.whiteChipOwner) {
        game.board = {
            ...game.board,
            whiteChipOwner: participant.id
        };
    } else if (!game.board.blackChipOwner) {
        game.board = {
            ...game.board,
            blackChipOwner: participant.id
        };
    }

    if (!game.board.activeParticipantId) {
        game.board.activeParticipantId = participant.id;
    }
}

export const gameUtils = {
    addParticipant,
};