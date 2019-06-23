const babel = {
  presets: [
    '@babel/preset-env',
    '@babel/preset-react',
  ],
  plugins: [
    '@babel/plugin-transform-runtime',
  ],
};

/* eslint-disable no-undef, import/no-commonjs */
module.exports = babel;
/* eslint-enable no-undef, import/no-commonjs */
