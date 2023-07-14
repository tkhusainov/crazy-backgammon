import React from 'react';

type Props = {
    children: React.ReactElement;
}

export const Layout: React.FC<Props> = ({children}) => {
    return (
        <div className='tw-h-full tw-bg-gray-light'>
            <div className='tw-h-12 tw-bg-green'>Header</div>
            {children}
        </div>
    );
};