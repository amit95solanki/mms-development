import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import DataProvider from './context/globalContext';
import store from './redux/store';
// routes
import Router from './routes';
// theme

import ThemeProvider from './theme';
// components
import { StyledChart } from './components/chart';
import ScrollToTop from './components/scroll-to-top';
import { AuthProvider } from './context/AuthProvider';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Provider store={store}>
          <AuthProvider>
            <DataProvider>
              <ThemeProvider>
                <ScrollToTop />
                <StyledChart />
                <Router />
              </ThemeProvider>
            </DataProvider>
          </AuthProvider>
        </Provider>
      </BrowserRouter>
    </HelmetProvider>
  );
}
