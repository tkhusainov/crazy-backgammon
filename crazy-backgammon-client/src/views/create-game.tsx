import React, {useCallback, useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {v4 as uuidv4} from 'uuid';

import {gameApi} from 'api';
import {useRequest} from 'hooks';
import {TRANSLATION_KEYS} from 'locale';
import {GameInstance} from 'types';

const T_KEYS = TRANSLATION_KEYS.CREATE_GAME_VIEW;

type Props = {
    onGameCreated: (game: GameInstance, localParticipantId: string) => void;
}

export const CreateGameView: React.FC<Props> = ({onGameCreated}) => {
    const {t} = useTranslation();
    const [name, setName] = useState('');
    const localParticipantId = useMemo(() => uuidv4(), []);

    const handleCreateSuccess = useCallback((g: GameInstance) => {
        onGameCreated(g, localParticipantId);
    }, [onGameCreated, localParticipantId]);
    const {send: createGame} = useRequest(gameApi.createGame, {onSuccess: handleCreateSuccess});

    const handleStartGame = useCallback(() => {
        createGame({id: localParticipantId, name}, {isCrazy:  false});
    }, [createGame, localParticipantId, name]);

    return (
        <div className='tw-flex tw-items-center tw-justify-center tw-h-full'>
            <div className='tw-flex tw-flex-col'>
                <input type="text" placeholder={t(T_KEYS.NAME)} onChange={(e) => setName(e.target.value)} />
                <button className='tw-bg-green tw-py-8 tw-px-12 tw-mt-4' onClick={handleStartGame}>{t(T_KEYS.CREATE_GAME)}</button>
            </div>
        </div>
    );
};