import {Server, WebSocket} from 'ws';

import {SocketEvent} from 'enums';
import {SocketMessage} from 'types';

const rooms: Record<string, string[]> = {}; // {'ABCD': ['websocketId']}

function parseSocketMessage(data: string): SocketMessage {
    return JSON.parse(data);
}

function stringifySocketMessage(data: SocketMessage): string {
    return JSON.stringify(data);
}

function onRoomCreated(message: SocketMessage) {
    if (rooms[message.roomCode]) {
        throw new Error('room already exists ' + message.roomCode);
    }
    rooms[message.roomCode] = [];
}

function onParticipantConnected(message: SocketMessage, ws: WebSocket, wss: Server) {
    const roomCode = message.roomCode;
    if (!rooms[roomCode]) {
        throw new Error('room not found ' + message);
    }
    wss.clients.forEach((_ws) => {
        if (rooms[roomCode].includes(_ws.id)) {
            _ws.send(stringifySocketMessage(message));
        }
    });
    rooms[roomCode].push(ws.id);
}

export function startSocketServer(port: number) {
    const wss = new Server({port});

    wss.on('connection', function connection(ws) {
        ws.on('error', console.error);
        ws.on('message', function (rawString: string) {
            const message: SocketMessage = parseSocketMessage(rawString);
            switch (message.event) {
            case SocketEvent.RoomCreated:
                onRoomCreated(message);
                return;
            case SocketEvent.ParticipantConnected:
                onParticipantConnected(message, ws, wss);
                return;
            }
        });
    });
}