import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    // deploy on github pages => repo name: stream-video
    base: process.env.NODE_ENV === 'development' ? './' : '/stream-video',

    plugins: [react()],
    resolve: {
        alias: {
            '~': path.resolve(__dirname, './src'),
            '~components': `${path.resolve(__dirname, './src/components')}`,
            '~pages': path.resolve(__dirname, './src/pages'),
            '~hooks': path.resolve(__dirname, './src/hooks'),
            '~layouts': path.resolve(__dirname, './src/layouts'),
            '~assets': path.resolve(__dirname, './src/assets'),
            '~images': path.resolve(__dirname, './src/assets/images'),
        },
    },
    server: {
        open: true,
        port: 3000,
    },
    preview: {
        port: 8080,
    },
});
