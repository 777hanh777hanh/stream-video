import React from 'react';
import WatchComponent from '~components/WatchComponent';
import { DefaultLayout, LandingLayout } from '~/layouts';
import { HomePage, SignInPage } from '~/pages';

const routes = {
    home: '/',
    watch: '/watch/:slug',
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
        children: [{ path: routes.watch, component: WatchComponent, layout: LandingLayout }],
    },
    {
        path: `${routes.home}/index.html`,
        component: HomePage,
        layout: DefaultLayout,
    },
    {
        path: routes.signin,
        component: SignInPage,
        layout: LandingLayout,
    },
    // ...
];

// privateRoutes

export { routes, publicRoutes };
