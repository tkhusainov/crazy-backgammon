import React, {useCallback, useState} from 'react';

import {useRequest} from '../hooks/request';
import {gameApi} from '../api/game.api';

export const CreateGameView: React.FC = () => {
    const [name, setName] = useState('');

    const {send: createGame} = useRequest(gameApi.createGame)

    const handleStartGame = useCallback(() => {
        createGame(name, {isCrazy:  false});
    }, [createGame, name]);

    return (
        <div>
            <input type="text" placeholder='Name' onChange={(e) => setName(e.target.value)} />
            <button onClick={handleStartGame}>Create Game</button>
        </div>
    )
}