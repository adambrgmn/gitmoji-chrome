import React, { Suspense, Fragment, useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Global from './style/Global';
import Header from './components/Header';
import SearchInput from './components/SearchInput';
import RecentList from './components/RecentList';
import EmojiList from './components/EmojiList';
import Footer from './components/Footer';
import Loader from './components/Loader';
import * as theme from './style/theme';

const Container = styled.div`
  position: relative;
`;

function App() {
  const [filterValue, setFilterValue] = useState('');

  return (
    <ThemeProvider theme={theme}>
      <Fragment>
        <Global />
        <Container>
          <Header />

          <SearchInput value={filterValue} onChange={setFilterValue} />

          <Suspense fallback={<Loader />}>
            <RecentList />
            <EmojiList filter={filterValue} />
          </Suspense>

          <Footer />
        </Container>
      </Fragment>
    </ThemeProvider>
  );
}

export { App as default };
