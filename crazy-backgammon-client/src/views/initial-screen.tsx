import React from 'react';

type Props = {
    onCreateGame: () => void;
    onJoinGame: () => void;
}

export const InitialScreen: React.FC<Props> = ({onCreateGame, onJoinGame}) => {
    return (
        <div>
            <button onClick={onCreateGame}>Create game</button>
            <button onClick={onJoinGame}>join game</button>
        </div>
    )
}