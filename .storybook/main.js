module.exports = {
  stories: [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    {
      name: "@storybook/addon-postcss",
      options: {
        postcssLoaderOptions: {
          implementation: require("postcss"),
        },
      },
    },
  ],
  framework: "@storybook/react",
  core: {
    builder: "webpack5",
  },
  staticDirs: ["../public"],
  // webpackFinal: async (baseConfig) => {
  //   const nextConfig = require('../next.config.js');

  //   // merge whatever from nextConfig into the webpack config storybook will use
  //   return { ...baseConfig, ...nextConfig };
  // },
  // babelDefault: async () => {
  //   return {
  //     compact: true,
  //     presets: ["@babel/preset-env", "@babel/preset-react", "@babel/babel-plugin-react-require"],
  //   };
  // }
  // },
};
