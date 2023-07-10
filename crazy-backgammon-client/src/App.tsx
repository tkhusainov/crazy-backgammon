import React from 'react';

import './App.css';
import {GameStatus} from './enums';
import {StartGameView} from './views/start-game';

function App() {
    const status = GameStatus.New;
    return (
        <div className="App">
            <div>Header</div>
            {status === GameStatus.New && <StartGameView />}
        </div>
    );
}

export default App;
