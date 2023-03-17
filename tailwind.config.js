module.exports = {
    content: ['./src/**/*.{jsx,tsx}', './pages/**/*.{jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: 'var(--primary)',
                primaryTextColor: 'var(--primaryTextColor)',
                secondary: 'var(--secondary)',
                secondaryTextColor: 'var(--secondaryTextColor)',
                background: 'var(--background)',
                color: 'var(--color)',
                warning: '#EAB308',
                danger: '#EF4444',
                success: '#019E4B',
            }
        },
    },
    plugins: [],
}
