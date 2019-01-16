module.exports = {
  presets: [['@babel/env', { targets: { node: true } }], '@babel/typescript'],
  plugins: [
    '@babel/proposal-class-properties',
    '@babel/proposal-object-rest-spread',
  ],
};
