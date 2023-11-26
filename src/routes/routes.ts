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
    component?: React.ComponentType;
    layout?: React.ComponentType<{ children: React.ReactNode }> | undefined;
    exact?: boolean;
    redirect?: string;
    children?: RouteProps[];
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
