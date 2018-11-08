import React, { Suspense, Fragment, lazy, useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Global from './style/Global';
import Header from './components/Header';
import SearchInput from './components/SearchInput';
import RecentList from './components/RecentList';
import EmojiList from './components/EmojiList';
import Footer from './components/Footer';
import Loader from './components/Loader';
import * as theme from './style/theme';
import SettingsButton from './components/SettingsButton';
import Notifications from './components/Notifications';
import ErrorBoundry from './components/ErrorBoundry';
import ErrorComp from './components/ErrorComp';

const Settings = lazy(() => import('./components/Settings'));

const Container = styled.main`
  position: relative;
`;

const PAGE = {
  emoji: 'EMOJI',
  settings: 'SETTINGS',
};

function App() {
  const [filterValue, setFilterValue] = useState('');
  const [page, setPage] = useState(PAGE.emoji);

  const transitionPage = () =>
    setPage(page === PAGE.emoji ? PAGE.settings : PAGE.emoji);

  return (
    <ThemeProvider theme={theme}>
      <Fragment>
        <Global />

        <Notifications />

        <Container>
          <SettingsButton onClick={transitionPage}>
            {page === PAGE.emoji ? '🛠' : '💾'}
          </SettingsButton>

          <Header />

          <div hidden={page !== PAGE.emoji}>
            <ErrorBoundry renderError={props => <ErrorComp {...props} />}>
              <SearchInput value={filterValue} onChange={setFilterValue} />

              <Suspense fallback={<Loader />}>
                <RecentList />
                <EmojiList filter={filterValue} />
              </Suspense>
            </ErrorBoundry>
          </div>

          <div hidden={page !== PAGE.settings}>
            <ErrorBoundry renderError={props => <ErrorComp {...props} />}>
              <Suspense fallback={<Loader />}>
                <Settings />
              </Suspense>
            </ErrorBoundry>
          </div>

          <Footer />
        </Container>
      </Fragment>
    </ThemeProvider>
  );
}

export { App as default };
