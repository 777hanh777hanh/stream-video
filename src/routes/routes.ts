import HomePage from '~/pages/HomePage';

const routes = {
    home: '/',
    watch: '/watch',
    signin: '/signin',
    signup: '/signup',
    logout: '/logout',
    saved: '/saved',
    setting: '/setting',
    list: '/list',
    stream: '/stream',
};

const publicRoutes = [
    {
        path: routes.home,
        component: HomePage,
    },
    // ...
];

// privateRoutes

export { publicRoutes };
