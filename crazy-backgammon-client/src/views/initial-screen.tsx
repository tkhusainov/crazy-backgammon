import React from 'react';
import {useTranslation} from 'react-i18next';

import {TRANSLATION_KEYS} from '../locale';

const T_KEYS = TRANSLATION_KEYS.INITIAL_SCREEN_VIEW;

type Props = {
    onCreateGame: () => void;
    onJoinGame: () => void;
}

export const InitialScreen: React.FC<Props> = ({onCreateGame, onJoinGame}) => {
    const {t} = useTranslation();

    return (
        <div>
            <button onClick={onCreateGame}>{t(T_KEYS.CREATE_GAME)}</button>
            <button onClick={onJoinGame}>{t(t(T_KEYS.JOIN_GAME))}</button>
        </div>
    )
}