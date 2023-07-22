import {isEmpty} from 'lodash';
import React, {useEffect, useRef, useState} from 'react';

import {BoardScene} from 'classes/board.scene';
import {Board} from 'types';

type Props = {
    data: Board;
}

export const BoardComponent: React.FC<Props> = ({data}) => {
    const boardContainer = useRef(null);
    const [initCompleted, setInitCompleted] = useState(false);
    const [boardScene, setBoardScene] = useState<BoardScene>(null);

    useEffect(() => {
        if (isEmpty(boardContainer.current?.children)) {
            const _boardScene = new BoardScene(boardContainer.current);
            _boardScene.initialize();
            _boardScene.animate();

            setInitCompleted(true);
            setBoardScene(_boardScene);
        }
    }, [initCompleted]);

    useEffect(() => {
        if (boardScene && data.gameChips) {
            boardScene.updateChips(data.gameChips);
        }
    }, [data, boardScene]);

    return (
        <div ref={boardContainer} className='board tw-w-1/2 tw-h-1/2 tw-bg-gray'></div>
    );
};