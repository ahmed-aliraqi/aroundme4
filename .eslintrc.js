module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:vue/vue3-recommended', // Vue 3-specific rules
        'plugin:prettier/recommended', // Integrates Prettier with ESLint
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['vue'],
    rules: {
        'vue/multi-word-component-names': 'off', // useful if using single-word component names
        'no-console': process.env.APP_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.APP_ENV === 'production' ? 'warn' : 'off',
    },
};
