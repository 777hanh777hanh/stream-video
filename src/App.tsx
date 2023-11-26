import { Routes } from 'react-router-dom';

import { renderRoutes } from '~/utils';
import { publicRoutes } from '~/routes';
function App() {
    return (
        <>
            <div className="App">
                {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                {/* @ts-expect-error */}
                <Routes>{renderRoutes(publicRoutes)}</Routes>
            </div>
        </>
    );
}

export default App;
