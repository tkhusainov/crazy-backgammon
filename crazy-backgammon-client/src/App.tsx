import React, {Fragment, useState} from 'react';

import {GameStatus} from './enums';
import {CreateGameView} from './views/create-game';
import {Layout} from './views/layout';
import {InitialScreen} from './views/initial-screen';
import {JoinGameView} from './views/join-game';

function App() {
    const [status, setStatus] = useState<GameStatus>(GameStatus.Initial);

    return (
        <Layout>
            <Fragment>
                {status === GameStatus.Initial &&
                    <InitialScreen
                        onCreateGame={() => setStatus(GameStatus.CreateGame)}
                        onJoinGame={() => setStatus(GameStatus.JoinGame)}
                    />}
                {status === GameStatus.CreateGame && <CreateGameView />}
                {status === GameStatus.JoinGame && <JoinGameView />}
            </Fragment>
        </Layout>
    );
}

export default App;
