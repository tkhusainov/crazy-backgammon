import {useEffect} from 'react';

import {SocketEvent} from 'enums';
import {Board, Participant} from 'types';

type Props = {
    onParticipantConnected: (participant: Participant) => void;
    onBoardUpdated: (board: Board) => void;
}

export function useGameSocket({onParticipantConnected, onBoardUpdated}: Props) {

    useEffect(() => {
        const ws = new WebSocket('ws://localhost:8085');
        ws.onopen = () => {
            ws.onmessage = async (event: MessageEvent) => {
                const dataString = await event.data;
                const data = JSON.parse(dataString);
                if (data.event === SocketEvent.ParticipantConnected) {
                    onParticipantConnected(data.data.participant);
                } else if (data.event === SocketEvent.BoardUpdated) {
                    onBoardUpdated(data.data.board);
                }
            };
        };
    }, [onParticipantConnected, onBoardUpdated]);

    return null;
}