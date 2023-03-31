const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    content: ['./src/**/*.{jsx,tsx}', './pages/**/*.{jsx,tsx}'],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: 'var(--primary)',
                primaryTextColor: 'var(--primaryTextColor)',
                secondary: 'var(--secondary)',
                secondaryTextColor: 'var(--secondaryTextColor)',
                background: 'var(--background)',
                color: 'var(--color)',
            },
            fontFamily: {
                sans: ['Inter', ...defaultTheme.fontFamily.sans],
            }
        },
    },
    plugins: [],
}
