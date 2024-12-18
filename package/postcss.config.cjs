module.exports = {
  plugins: {
    "postcss-preset-env": {
      stage: 1,
    },
    "postcss-modules": {
      generateScopedName: "[name]__[local]___[hash:base64:5]",
    },
  },
};
