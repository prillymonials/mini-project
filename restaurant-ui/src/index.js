import React from 'react';
import ReactDOM from 'react-dom';

import 'jquery/dist/jquery.min';
import 'bootstrap/dist/js/bootstrap.min';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
