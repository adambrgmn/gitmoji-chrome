import React, { Component } from 'react';
import Notify from './components/Notify';
import Header from './components/Header';
import SearchInput from './components/SearchInput';
import RecentList from './components/RecentList';
import EmojiList from './components/EmojiList';
import Footer from './components/Footer';

class App extends Component {
  state = { filter: '' };

  componentDidCatch(error) {
    console.error(error.message);
  }

  handleChange = ({ target }) => {
    const filter = target.value;
    this.setState(() => ({ filter }));
  };

  render() {
    const { filter } = this.state;

    return (
      <div className="container">
        <Notify />
        <Header />
        <SearchInput onChange={this.handleChange} value={filter} />
        <RecentList />
        <EmojiList filter={filter} />
        <Footer />
      </div>
    );
  }
}

export default App;
