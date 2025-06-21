import globals from 'globals';
import pluginJs from '@eslint/js';

export default [
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node, // Adiciona as globais do Node.js, incluindo 'process'
                ...globals.jest, // Adiciona as globais do Jest
            },
        },
    },
    pluginJs.configs.recommended,
];
