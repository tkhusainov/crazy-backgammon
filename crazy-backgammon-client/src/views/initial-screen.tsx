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
        <div className='tw-flex tw-items-center tw-justify-center tw-h-full'>
            <div className='tw-flex tw-flex-col'>
                <button className='tw-bg-green tw-py-8 tw-px-12 tw-mb-4' onClick={onCreateGame}>{t(T_KEYS.CREATE_GAME)}</button>
                <button className='tw-bg-blue tw-py-8 tw-px-12' onClick={onJoinGame}>{t(t(T_KEYS.JOIN_GAME))}</button>
            </div>
        </div>
    )
}