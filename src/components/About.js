import React, { memo } from 'react';
import SettingsSectionTitle from './SettingsSectionTitle';
import Link from './Link';

const About = memo(() => (
  <div>
    <SettingsSectionTitle>About:</SettingsSectionTitle>
    <p>
      This extension is a utility to copy the markdown codes for emojis for use
      inside e.g. markdown files or git commits.
    </p>

    <p>
      The actual emojis and their meaning is fethced from{' '}
      <Link href="https://github.com/carloscuesta/gitmoji/">
        carloscuesta/gitmoji
      </Link>
      . If you are missing any emojis, please contribute to that repo and they
      will be fethced automagically by this extension.
    </p>
  </div>
));

export { About as default };
