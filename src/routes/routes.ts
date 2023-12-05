import React from 'react';
import { DefaultLayout, LandingLayout } from '~/layouts';
import { HomePage, SignInPage } from '~/pages';

const routes = {
    home: '/',
    watch: '/watch/:id',
    signin: '/signin',
    signup: '/signup',
    logout: '/logout',
    saved: '/saved',
    setting: '/setting',
    list: '/list',
    stream: '/stream',
};

type RoutesProps = {
    path: string;
    component?: React.FC<{ children: React.ReactNode }> | null | undefined;
    layout?: React.FC<{ children: React.ReactNode }> | null | undefined;
    children?: RoutesProps[] | null | undefined;
    exact?: boolean;
    redirect?: string;
};

const publicRoutes: RoutesProps[] = [
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
        component: SignInPage,
        layout: LandingLayout,
    },
    {
        path: routes.watch,
        component: HomePage,
        layout: LandingLayout,
    },
    // ...
];

// privateRoutes

export { publicRoutes };
