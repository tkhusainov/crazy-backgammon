import React, {useEffect, useRef, useState} from 'react';
import {isEmpty} from 'lodash';

import {BoardScene} from '../../classes/board.scene';

export const Board: React.FC = () => {
    const boardContainer = useRef(null);
    const [initCompleted, setInitCompleted] = useState(false);

    useEffect(() => {
        if (isEmpty(boardContainer.current?.children)) {
            const boardScene = new BoardScene(boardContainer.current);
            boardScene.initialize();
            boardScene.animate();

            setInitCompleted(true);
        }
    }, [initCompleted]);

    return (
        <div ref={boardContainer} className='board tw-w-96 tw-h-96 tw-bg-gray'></div>
    )
}