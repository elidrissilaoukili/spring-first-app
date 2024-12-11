import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './src/**/*.{js,jsx}',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                brown: {
                    100: '#f3e9e1',
                    200: '#e0cfc0',
                    300: '#c9ae99',
                    400: '#a8826f',
                    500: '#855a45',
                    600: '#6a452f',
                    700: '#523525',
                    800: '#3a261b',
                    900: '#271710',
                },
                'scrollbar-thumb': '#4B5563',  // custom thumb color
                'scrollbar-track': '#F3F4F6',  // custom track color
            },
            scrollbar: {
                width: '6px',  // custom width
            },
        },
    },

    plugins: [],
};
