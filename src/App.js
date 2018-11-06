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

        <Container>
          <SettingsButton onClick={transitionPage}>
            {page === PAGE.emoji ? '🛠' : '💾'}
          </SettingsButton>

          <Header />

          <div hidden={page !== PAGE.emoji}>
            <SearchInput value={filterValue} onChange={setFilterValue} />

            <Suspense fallback={<Loader />}>
              <RecentList />
              <EmojiList filter={filterValue} />
            </Suspense>
          </div>

          <div hidden={page !== PAGE.settings}>
            <Suspense fallback={<Loader />}>
              <Settings />
            </Suspense>
          </div>

          <Footer />
        </Container>
      </Fragment>
    </ThemeProvider>
  );
}

export { App as default };
