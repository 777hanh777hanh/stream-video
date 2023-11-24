import { Routes } from 'react-router-dom';

import { renderRoutes } from '~/utils';
import { publicRoutes } from '~/routes';

function App() {
    return (
        <>
            <div className="App">
                <Routes>{renderRoutes(publicRoutes)}</Routes>
            </div>
        </>
    );
}

export default App;
