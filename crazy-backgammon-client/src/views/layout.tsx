import React from 'react';

type Props = {
    children: React.ReactElement;
}

export const Layout: React.FC<Props> = ({children}) => {
    return (
        <div>
            <div>Header</div>
            {children}
        </div>
    );
}