const isEnvTest = process.env.NODE_ENV === 'test';
const isEnvDevelopment = process.env.NODE_ENV === 'development';
const isEnvProduction = process.env.NODE_ENV === 'production';

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'entry',
        targets: { esmodules: true },
        exclude: ['transform-typeof-symbol'],
      },
    ],
    [
      '@babel/preset-react',
      {
        useBuiltIns: true,
        development: isEnvDevelopment || isEnvTest,
      },
    ],
  ],
  plugins: [
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: false,
        regenerator: true,
        useESModules: isEnvDevelopment || isEnvProduction,
      },
    ],
    isEnvProduction && [
      'babel-plugin-transform-react-remove-prop-types',
      { removeImport: true },
    ],
    '@babel/plugin-syntax-dynamic-import',
    isEnvTest && 'babel-plugin-dynamic-import-node',
  ].filter(Boolean),
};
