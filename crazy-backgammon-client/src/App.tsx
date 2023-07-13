import React, {Fragment, useCallback, useState} from 'react';
import {map, includes} from 'lodash';

import {GameStatus} from './enums';
import {CreateGameView} from './views/create-game';
import {Layout} from './views/layout';
import {InitialScreen} from './views/initial-screen';
import {JoinGameView} from './views/join-game';
import {GameInstance, Participant} from './types';
import {InGameView} from './views/in-game';
import {useGameSocket} from './hooks/game-socket';

function App() {
    const [localParticipantId, setLocalParticipantId] = useState<string>('');
    const [status, setStatus] = useState<GameStatus>(GameStatus.Initial);
    const [game, setGame] = useState<GameInstance|null>(null);

    const handleParticipantConnected = useCallback((participant: Participant) => {
        setGame((prev) => {
            if (prev) {
                const prevParticipantIds = map(prev.participants, (p: Participant) => p.id);
                if (includes(prevParticipantIds, participant.id)) {
                    return prev;
                }

                return {
                    ...prev,
                    participants: [...prev.participants, participant]
                }
            }
            return prev;
        });
    }, []);
    useGameSocket({onParticipantConnected: handleParticipantConnected});

    const handleGameStart = useCallback((g: GameInstance, participantId: string) => {
        setGame(g);
        setLocalParticipantId(participantId);
        setStatus(GameStatus.InProgress);
    }, []);

    const handleGameJoin = useCallback((g: GameInstance, participantId: string) => {
        setGame(g);
        setLocalParticipantId(participantId);
        setStatus(GameStatus.InProgress);
    }, []);

    return (
        <Layout>
            <Fragment>
                {status === GameStatus.Initial &&
                    <InitialScreen
                        onCreateGame={() => setStatus(GameStatus.CreateGame)}
                        onJoinGame={() => setStatus(GameStatus.JoinGame)}
                    />}
                {status === GameStatus.CreateGame && <CreateGameView onGameCreated={handleGameStart} />}
                {status === GameStatus.JoinGame && <JoinGameView onGameJoin={handleGameJoin} />}
                {game && status === GameStatus.InProgress && <InGameView game={game} localParticipantId={localParticipantId} />}
            </Fragment>
        </Layout>
    );
}

export default App;
