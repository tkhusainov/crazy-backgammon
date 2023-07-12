import React, {useCallback, useState} from 'react';
import {useTranslation} from 'react-i18next';

import {useRequest} from '../hooks/request';
import {gameApi} from '../api/game.api';
import {TRANSLATION_KEYS} from '../locale';

const T_KEYS = TRANSLATION_KEYS.JOIN_GAME_VIEW;

export const JoinGameView: React.FC = () => {
    const {t} = useTranslation();
    const [name, setName] = useState('');
    const [code, setCode] = useState('');

    const {send: joinGame} = useRequest(gameApi.joinGame)

    const handleStartGame = useCallback(() => {
        joinGame(name, code);
    }, [joinGame, name, code]);

    return (
        <div className='tw-flex tw-items-center tw-justify-center tw-h-full'>
            <div className='tw-flex tw-flex-col'>
                <input className='tw-mb-4' type="text" placeholder={t(T_KEYS.NAME)} onChange={(e) => setName(e.target.value)} />
                <input className='tw-mb-4' type="text" placeholder={t(T_KEYS.CODE)} onChange={(e) => setCode(e.target.value)} />
                <button className='tw-bg-blue tw-py-8 tw-px-12' onClick={handleStartGame}>{t(T_KEYS.JOIN_GAME)}</button>
            </div>
        </div>
    )
}