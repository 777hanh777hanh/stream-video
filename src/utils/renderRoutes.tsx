import { FC, Fragment, ReactNode } from 'react';
import { Route } from 'react-router-dom';

import { DefaultLayout } from '~/layouts';

interface RouteProps {
    path: string;
    component: FC;
    layout?: FC | null;
    children?: RouteProps[];
}

const renderRoutes = (routes: RouteProps[]) => {
    if (Array.isArray(routes)) {
        return routes.map((route, index) => {
            const Page = route.component;

            let Layout: ({ children }: { children: ReactNode }) => ReactNode = DefaultLayout;
            if (route.layout) {
                Layout = route.layout;
            } else if (route.layout === null) {
                Layout = Fragment;
            }
            return (
                <Route
                    key={index}
                    path={route.path}
                    element={
                        <Layout>
                            <Page />
                        </Layout>
                    }
                >
                    {route.children && renderRoutes(route.children)}
                </Route>
            );
        });
    }
    return null;
};

export default renderRoutes;