import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '~': path.resolve(__dirname, './src'),
            '~components': `${path.resolve(__dirname, './src/components')}`,
            '~pages': path.resolve(__dirname, './src/pages'),
            '~hooks': path.resolve(__dirname, './src/hooks'),
        },
    },
    server: {
        open: true,
        port: 3000,
    },
});
