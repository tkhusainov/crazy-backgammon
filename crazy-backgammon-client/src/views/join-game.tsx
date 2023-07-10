import React, {useCallback, useState} from 'react';

import {useRequest} from '../hooks/request';
import {gameApi} from '../api/game.api';

export const JoinGameView: React.FC = () => {
    const [name, setName] = useState('');
    const [code, setCode] = useState('');

    const {send: joinGame} = useRequest(gameApi.joinGame)

    const handleStartGame = useCallback(() => {
        joinGame(name, code);
    }, [joinGame, name, code]);

    return (
        <div>
            <input type="text" placeholder='Name' onChange={(e) => setName(e.target.value)} />
            <input type="text" placeholder='Code' onChange={(e) => setCode(e.target.value)} />
            <button onClick={handleStartGame}>Create Game</button>
        </div>
    )
}