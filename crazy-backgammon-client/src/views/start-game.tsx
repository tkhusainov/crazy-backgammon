import React, { useCallback, useState } from 'react';
import { useRequest } from '../hooks/request';
import { createGame } from '../api/game.api';

export const StartGameView: React.FC = () => {
    const [name, setName] = useState('');

    const {send: createGameFn} = useRequest(createGame)

    const handleStartGame = useCallback(() => {
        createGameFn(name, {isCrazy: false});
    }, [createGameFn, name]);

    return (
        <div>
            <input type="text" placeholder='Name' onChange={(e) => setName(e.target.value)} />
            <button onClick={handleStartGame}>Create Game</button>
        </div>
    )
}