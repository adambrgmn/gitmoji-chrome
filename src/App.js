import React, { Component } from 'react';
import * as storage from './utils/storage';
import Notify from './components/Notify';
import Header from './components/Header';
import SearchInput from './components/SearchInput';
import RecentPreview, {
  RecentPreviewContainer,
} from './components/RecentPreview';
import EmojiPreview, { EmojiPreviewContainer } from './components/EmojiPreview';
import Footer from './components/Footer';
import extractScssVars from './utils/extract-scss-vars';
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

  timeout = null;

  componentDidMount() {
    this.fetchEmojis();
    this.fetchRecent();
    this.fetchEmojiColors();
  }

  componentDidCatch(error) {
    const msg = {
      message: error.message,
      type: 'error',
    };

    this.setState(() => ({ message: msg }));
  }

  fetchEmojis = async () => {
    try {
      const res = await fetch(
        'https://raw.githubusercontent.com/carloscuesta/gitmoji/master/src/data/gitmojis.json',
      );
      const { gitmojis } = await res.json();

      this.setState(({ emojis }) => ({
        emojis: gitmojis,
      }));
    } catch (e) {
      this.handleError(e);
    }
  };

  fetchEmojiColors = async () => {
    try {
      const res = await fetch(
        'https://raw.githubusercontent.com/carloscuesta/gitmoji/master/src/styles/_includes/_vars.scss',
      );
      const scss = await res.text();
      const match = extractScssVars(scss);

      this.setState(({ colors }) => ({ colors: [...colors, ...match] }));
    } catch (e) {
      this.handleError(e);
    }
  };

  fetchRecent = async () => {
    try {
      const { recentEmojis } = await storage.get('recentEmojis');
      if (Array.isArray(recentEmojis)) {
        this.setState(() => ({ recent: recentEmojis }));
      }
    } catch (e) {
      this.handleError(e);
    }
  };

  addToRecentlyUsed = async emoji => {
    try {
      const recent = [
        emoji,
        ...this.state.recent.filter(e => e.code !== emoji.code),
      ].slice(0, 5);

      this.setState(() => ({ recent }));

      await storage.set('recentEmojis', recent);
    } catch (e) {
      this.handleError(e);
    }
  };

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

  filterEmojis = () => {
    const { emojis, filter } = this.state;
    if (!filter) return emojis;

    return emojis.filter(e => {
      const { code, description } = e;
      const lowerInput = filter.toLowerCase();

      if (
        code.toLowerCase().includes(lowerInput) ||
        description.toLowerCase().includes(lowerInput)
      )
        return true;
      return false;
    });
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

        <EmojiPreviewContainer>
          {this.filterEmojis().map(e => (
            <EmojiPreview
              key={e.code}
              emoji={e}
              color={this.findMatchingColor(e.name)}
              onClick={() => this.handleClick(e)}
            />
          ))}
        </EmojiPreviewContainer>

        <Footer />
      </div>
    );
  }
}

export default App;
