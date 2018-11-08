module.exports = {
  branch: 'master',
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/git',
    ['@semantic-release/github', { assets: ['dist/**'] }],
    [
      'semantic-release-chrome',
      {
        asset: 'gitmoji-chrome.zip',
        extensionId: 'jhhfejfgefheljcenfehikpfmmpglhca',
      },
    ],
  ],
};
