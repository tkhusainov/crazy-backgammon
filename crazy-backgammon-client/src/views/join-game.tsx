import React, {useCallback, useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {v4 as uuidv4} from 'uuid';

import {gameApi} from 'api';
import {useRequest} from 'hooks';
import {TRANSLATION_KEYS} from 'locale';
import {GameInstance} from 'types';

const T_KEYS = TRANSLATION_KEYS.JOIN_GAME_VIEW;

type Props = {
    onGameJoin: (g: GameInstance, localParticipantId: string) => void;
}

export const JoinGameView: React.FC<Props> = ({onGameJoin}) => {
    const {t} = useTranslation();
    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const localParticipantId = useMemo(() => uuidv4(), []);

    const handleJoinSuccess = useCallback((g: GameInstance) => {
        onGameJoin(g, localParticipantId);
    }, [localParticipantId, onGameJoin]);
    const {send: joinGame} = useRequest(gameApi.joinGame, {onSuccess: handleJoinSuccess});

    const handleStartGame = useCallback(() => {
        joinGame({id: localParticipantId, name}, code);
    }, [localParticipantId, joinGame, name, code]);

    return (
        <div className='tw-flex tw-items-center tw-justify-center tw-h-full'>
            <div className='tw-flex tw-flex-col'>
                <input className='tw-mb-4' type="text" placeholder={t(T_KEYS.NAME)} onChange={(e) => setName(e.target.value)} />
                <input className='tw-mb-4' type="text" placeholder={t(T_KEYS.CODE)} onChange={(e) => setCode(e.target.value)} />
                <button className='tw-bg-blue tw-py-8 tw-px-12' onClick={handleStartGame}>{t(T_KEYS.JOIN_GAME)}</button>
            </div>
        </div>
    );
};