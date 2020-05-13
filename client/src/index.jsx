import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faCalendarAlt,
  faCopy,
  faDownload,
  faEquals,
  faExternalLinkSquareAlt,
  faFont,
  faHashtag,
  faLink,
  faListOl,
  faParagraph,
  faPlus,
  faQuestionCircle,
  faSort,
  faSortNumericDown,
  faThLarge,
  faTimes,
  faToggleOff,
  faTrash,
  faAngleDown,
  faProjectDiagram,
  faHome,
  faSortDown,
  faQuestion,
} from '@fortawesome/free-solid-svg-icons';
import * as serviceWorker from './serviceWorker';
import App from './App';

library.add(faTimes,
  faExternalLinkSquareAlt,
  faPlus,
  faTrash,
  faSort,
  faDownload,
  faLink,
  faEquals,
  faCopy,
  faThLarge,
  faFont,
  faHashtag,
  faToggleOff,
  faCalendarAlt,
  faListOl,
  faParagraph,
  faQuestionCircle,
  faSortNumericDown,
  faAngleDown,
  faProjectDiagram,
  faHome,
  faSortDown,
  faQuestion);

const rootDocument = document.getElementById('root');

ReactDOM.render(<App />, rootDocument);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
