import {map, includes} from 'lodash';
import React, {Fragment, useCallback, useState} from 'react';

import {GameStatus} from 'enums';
import {useGameSocket} from 'hooks/game-socket';
import {Board, GameInstance, Participant} from 'types';
import {CreateGameView, InGameView, InitialScreen, JoinGameView, Layout} from 'views';

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
                };
            }
            return prev;
        });
    }, []);

    const handleBoardUpdated = useCallback((board: Board) => {
        setGame((prev) => {
            if (prev) {
                return {
                    ...prev,
                    board
                };
            }
            return prev;
        });
    }, []);

    useGameSocket({
        onParticipantConnected: handleParticipantConnected,
        onBoardUpdated: handleBoardUpdated
    });

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
