import {SocketEvent} from 'enums';

export type SocketMessage = {
    event: SocketEvent;
    roomCode: string;
    data?: any;
}