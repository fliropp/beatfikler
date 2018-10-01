import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Beatfikler from './Beatfikler';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Beatfikler />, document.getElementById('root'));
registerServiceWorker();
