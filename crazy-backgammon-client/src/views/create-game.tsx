import React, {useCallback, useState} from 'react';
import {useTranslation} from 'react-i18next';

import {useRequest} from '../hooks/request';
import {gameApi} from '../api/game.api';
import {TRANSLATION_KEYS} from '../locale';

const T_KEYS = TRANSLATION_KEYS.CREATE_GAME_VIEW;

export const CreateGameView: React.FC = () => {
    const {t} = useTranslation();
    const [name, setName] = useState('');

    const {send: createGame} = useRequest(gameApi.createGame)

    const handleStartGame = useCallback(() => {
        createGame(name, {isCrazy:  false});
    }, [createGame, name]);

    return (
        <div className='tw-flex tw-items-center tw-justify-center tw-h-full'>
            <div className='tw-flex tw-flex-col'>
                <input type="text" placeholder={t(T_KEYS.NAME)} onChange={(e) => setName(e.target.value)} />
                <button className='tw-bg-green tw-py-8 tw-px-12 tw-mt-4' onClick={handleStartGame}>{t(T_KEYS.CREATE_GAME)}</button>
            </div>
        </div>
    )
}