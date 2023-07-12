module.exports = {
    prefix: 'tw-',
    content: [
        './src/**/*.{ts,tsx,scss}',
    ],
    theme: {
        extend: {
            screens: {
                '-2xl': {max: '1535.9px'},
                '-xl': {max: '1279.9px'},
                '-lg': {max: '1023.9px'},
                '-md': {max: '767.9px'},
                '-sm': {max: '639.9px'},
                landscape: {raw: '(orientation: landscape)'},
                'lg-landscape': {raw: 'only screen and (min-width: 1024px) and (orientation: landscape)'},
                '-lg-landscape': {raw: 'only screen and (max-width: 1023.9px) and (orientation: landscape)'},
            },
            colors: {
                'blue': '#1fb6ff',
                'purple': '#7e5bef',
                'pink': '#ff49db',
                'orange': '#ff7849',
                'green': '#13ce66',
                'yellow': '#ffc82c',
                'gray-dark': '#273444',
                'gray': '#8492a6',
                'gray-light': '#d3dce6',
            }
        },
    },
    plugins: [],
}

