import ReactDOM from 'react-dom/client';
import axios from 'axios';
import App from './App';
// import * as serviceWorker from './serviceWorker';
import reportWebVitals from './reportWebVitals';

// ----------------------------------------------------------------------
import * as _redux from './redux';

_redux.setupAxios(axios);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<App />);

reportWebVitals();
