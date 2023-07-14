import React from 'react';
import {map} from 'lodash';

import {Board} from '../components';
import {GameInstance} from '../types';

type Props = {
    game: GameInstance;
    localParticipantId: string;
}

export const InGameView: React.FC<Props> = ({game, localParticipantId}) => {
    return (
        <div className='tw-flex tw-items-center tw-justify-center tw-h-full'>
            <div className='tw-flex tw-flex-col'>
                Game in progress
                <div className='tw-text-red'>{game.code}</div>
                {map(game.participants, (p) => (
                    <div key={p.id}>
                        {p.name}
                        {localParticipantId === p.id && <span className='tw-pl-2 tw-text-red'>(ME)</span>}
                    </div>
                ))}
            </div>
            <Board />
        </div>
    )
}