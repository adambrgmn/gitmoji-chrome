import React, { Component } from 'react';
import * as storage from './utils/storage';
import Header from './components/Header';
import SearchInput from './components/SearchInput';
import RecentPreview, {
  RecentPreviewContainer,
} from './components/RecentPreview';
import EmojiPreview, { EmojiPreviewContainer } from './components/EmojiPreview';
import SuccessMessage from './components/SuccessMessage';

class App extends Component {
  state = {
    recent: [],
    emojis: [],
    colors: [],
    filter: '',
    copied: null,
    showMessage: false,
  };

  timeout = null;

  componentDidMount() {
    this.fetchEmojis();
    this.fetchRecent();
  }

  fetchEmojis = async () => {
    const res = await fetch(
      'https://raw.githubusercontent.com/carloscuesta/gitmoji/master/src/data/gitmojis.json',
    );
    const { gitmojis } = await res.json();

    this.setState(
      ({ emojis }) => ({
        emojis: [...emojis, ...gitmojis],
      }),
      this.fetchEmojiColors,
    );
  };

  fetchEmojiColors = async () => {
    const variableRe = /((\w|-)+): \$(\w+),/g;
    const res = await fetch(
      'https://raw.githubusercontent.com/carloscuesta/gitmoji/master/src/styles/_includes/_vars.scss',
    );
    const scss = await res.text();
    const match = [];
    let haveResult = true;

    while (haveResult) {
      const result = variableRe.exec(scss);

      if (result == null || result.length < 1) {
        haveResult = false;
      } else {
        const emojiName = result[1];
        const colorName = result[3];
        const re = new RegExp(`\\$${colorName}\\s?: (#.{6});`, 'g');
        const [, color] = re.exec(scss);

        match.push({ name: emojiName, color });
      }
    }

    this.setState(({ colors }) => ({ colors: [...colors, ...match] }));
  };

  fetchRecent = async () => {
    try {
      const { recentEmojis } = await storage.get('recentEmojis');
      if (Array.isArray(recentEmojis)) {
        this.setState(() => ({ recent: recentEmojis }));
      }
    } catch (e) {
      console.error(e.message);
    }
  };

  addToRecentlyUsed = async emoji => {
    const recent = [
      emoji,
      ...this.state.recent.filter(e => e.code !== emoji.code),
    ].slice(0, 5);

    this.setState(() => ({ recent }));

    try {
      await storage.set('recentEmojis', recent);
    } catch (e) {
      console.error(e.message);
    }
  };

  handleChange = ({ target }) => {
    const filter = target.value;
    this.setState(() => ({ filter }));
  };

  handleClick = emoji => {
    try {
      const textarea = document.createElement('textarea');
      textarea.value = emoji.code;
      document.body.append(textarea);
      textarea.select();

      const success = document.execCommand('Copy');
      if (success) {
        document.body.removeChild(textarea);
        this.setState(() => ({
          copied: emoji,
          showMessage: true,
          error: null,
        }));

        this.addToRecentlyUsed(emoji);
        this.timeout = window.setTimeout(
          () => this.setState(() => ({ showMessage: false })),
          3000,
        );
      }
    } catch (error) {
      this.setState(() => ({ error }));
    }

    try {
      /* eslint-disable */
      chrome.tabs.query({ active: true }, tabs => {
        chrome.tabs.sendMessage(tabs[0].id, { emoji })
      });
      /* eslint-enable */
    } catch (e) {
      console.error(e.message)
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

  render() {
    const { recent, filter, copied, showMessage } = this.state;

    return (
      <div className="container">
        <SuccessMessage
          emoji={copied}
          show={copied && showMessage}
          hide={copied && !showMessage}
        />

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

        <footer className="footer">
          <p className="credit">
            Send all love to{' '}
            <a href="https://github.com/carloscuesta/gitmoji/">
              carloscuesta/gitmoji
            </a>
          </p>
        </footer>
      </div>
    );
  }
}

export default App;
