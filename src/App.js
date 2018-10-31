import React, { Suspense, Fragment, useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Global from './style/Global';
import Header from './components/Header';
import SearchInput from './components/SearchInput';
import EmojiList from './components/EmojiList';
import Footer from './components/Footer';
import * as theme from './style/theme';
import emojis from '../test/data/gitmojis.json';

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

          <Suspense fallback={<p>Loading...</p>}>
            <EmojiList filter={filterValue} emojis={emojis} />
          </Suspense>

          <Footer />
        </Container>
      </Fragment>
    </ThemeProvider>
  );
}

export { App as default };
