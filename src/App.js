import React, { Component } from 'react';
import styled from 'styled-components';
import debounce from 'lodash/debounce';
import Notify from './components/Notify';
import Header from './components/Header';
import SearchInput from './components/SearchInput';
import RecentList from './components/RecentList';
import EmojiList from './components/EmojiList';
import Footer from './components/Footer';
import Settings from './components/Settings';

const Container = styled.div`
  position: relative;
`;

class App extends Component {
  state = { filter: '', value: '' };

  componentDidCatch(error) {
    console.error(error.message);
  }

  handleChange = ({ target }) => {
    const value = target.value;
    this.setState(() => ({ value }));
    this.updateFilter(value);
  };

  updateFilter = debounce(filter => this.setState(() => ({ filter })), 500);

  render() {
    const { filter, value } = this.state;

    return (
      <Container>
        <Notify />
        <Header />
        <SearchInput onChange={this.handleChange} value={value} />
        <RecentList />
        <EmojiList filter={filter} />
        <Footer />
        <Settings />
      </Container>
    );
  }
}

export { App as default };
