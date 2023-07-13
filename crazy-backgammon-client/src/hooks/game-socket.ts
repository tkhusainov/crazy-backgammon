import {useEffect} from 'react';

import {Participant} from '../types';
import {SocketEvent} from '../enums';

type Props = {
    onParticipantConnected: (participant: Participant) => void;
}

export function useGameSocket({onParticipantConnected}: Props) {

    useEffect(() => {
        const ws = new WebSocket('ws://localhost:8085');
        ws.onopen = () => {
            ws.onmessage = async (event: MessageEvent) => {
                const dataString = await event.data;
                const data = JSON.parse(dataString);
                if (data.event === SocketEvent.ParticipantConnected) {
                    onParticipantConnected(data.data.participant);
                }
            }
        }
    }, []);

    return null;
}