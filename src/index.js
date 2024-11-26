import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppRoutes from './routes';

ReactDOM.render(
    <React.StrictMode>
        <h1>Resume Builder</h1>
        <AppRoutes />
    </React.StrictMode>,
    document.getElementById('root')
);
