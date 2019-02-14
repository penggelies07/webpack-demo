import React from 'react';
import { render } from 'react-dom';
import App from './app';

const renderDom = (Component: any) => {
    render(
        <Component />,
        document.getElementById('app')
    );
};

renderDom(App);

// console.log('module: ', module);
if (module.hot) {
    module.hot.accept('./app', () => {
        const App = require('./app').default;
        renderDom(App);
    });
} 