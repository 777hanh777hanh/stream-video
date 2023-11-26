import React from 'react';
import { DefaultLayout, LandingLayout } from '~/layouts';
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

interface RouteProps {
    path: string;
    component?: () => JSX.Element | null;
    layout?: React.FC<{ children: React.ReactNode }>;
    exact?: boolean;
    redirect?: string;
    routes?: RouteProps[];
}

const publicRoutes: RouteProps[] = [
    {
        path: routes.home,
        component: HomePage,
        layout: DefaultLayout,
    },
    {
        path: `${routes.home}/index.html`,
        component: HomePage,
        layout: LandingLayout,
    },
    {
        path: routes.signin,
        layout: LandingLayout,
    },
    // ...
];

// privateRoutes

export { publicRoutes };
