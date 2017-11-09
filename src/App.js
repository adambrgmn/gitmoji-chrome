import React, { Component } from 'react';
import Notify from './components/Notify';
import Header from './components/Header';
import SearchInput from './components/SearchInput';
import RecentPreview, {
  RecentPreviewContainer,
} from './components/RecentPreview';
import EmojiList from './components/EmojiList';
import Footer from './components/Footer';
import * as message from './utils/message';
import * as clipboard from './utils/clipboard';

class App extends Component {
  state = {
    recent: [],
    emojis: [],
    colors: [],
    filter: '',
    messages: [],
  };

  componentDidCatch(error) {
    const msg = {
      message: error.message,
      type: 'error',
    };

    this.setState(() => ({ message: msg }));
  }

  handleChange = ({ target }) => {
    const filter = target.value;
    this.setState(() => ({ filter }));
  };

  handleClick = emoji => {
    try {
      const success = clipboard.copy(emoji.code);

      if (success) {
        const newMessage = {
          message: `Copied ${emoji.code} to clipboard!`,
          emoji: emoji.emoji,
          type: 'standard',
        };

        this.addMessage(newMessage);

        this.addToRecentlyUsed(emoji);
        message.send({ emoji }).catch(e => console.error(e.message));
      }
    } catch (e) {
      this.handleError(e);
    }
  };

  findMatchingColor = name => {
    const { colors } = this.state;
    const defaultColor = 'var(--color-yellow)';
    if (colors.length < 1) return defaultColor;

    const match = colors.find(c => c.name === name);
    if (match == null) return defaultColor;
    return match.color;
  };

  addMessage = msg => {
    this.setState(({ messages }) => ({ messages: [...messages, msg] }));
  };

  handleError = e => {
    const msg = {
      message: e.message,
      type: 'error',
    };

    this.setState(({ messages }) => ({
      messages: [...messages, msg],
    }));
  };

  render() {
    const { recent, filter, messages } = this.state;

    return (
      <div className="container">
        <Notify messages={messages} />

        <Header />

        <SearchInput onChange={this.handleChange} value={filter} />

        {filter.length < 1 && (
            <RecentPreviewContainer>
              {recent.map(e => (
                <RecentPreview
                  key={e.code}
                  emoji={e}
                  color={this.findMatchingColor(e.name)}
                  onClick={() => this.handleClick(e)}
                />
              ))}
            </RecentPreviewContainer>
          )}

        <EmojiList />

        <Footer />
      </div>
    );
  }
}

export default App;
