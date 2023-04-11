module.exports = {
    extends: [
        'plugin:vue/vue3-recommended',
        'eslint:recommended',
        'prettier',
    ],
    plugins: ['prettier'],
    rules: {
        'vue/multi-word-component-names': 'off',
        'prettier/prettier': 'error',
    },
};