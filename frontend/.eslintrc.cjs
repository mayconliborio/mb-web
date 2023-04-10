module.exports = {
    extends: [
        'plugin:vue/vue3-essential',
        'eslint:recommended',
        'prettier',
    ],
    plugins: ['vue', 'prettier'],
    rules: {
        'vue/multi-word-component-names': 'off',
        'prettier/prettier': 'error',
    },
};