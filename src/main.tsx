import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
// import { HashRouter as Router } from 'react-router-dom';

import App from './App.tsx';
import GlobalStyles from '~components/GlobalStyles';
import './index.css';

const isDevelopment = process.env.NODE_ENV === 'development';

// deploy on github pages => repo name: stream-video
const basename = isDevelopment ? '/stream-video' : '/stream-video';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Router basename={basename}>
            <GlobalStyles>
                <App />
            </GlobalStyles>
        </Router>
    </React.StrictMode>,
);
