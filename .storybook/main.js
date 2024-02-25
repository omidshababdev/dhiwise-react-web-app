const path = require("path");
const { mergeConfig, loadConfigFromFile } = require("vite");
const tsconfigPaths = require("vite-tsconfig-paths");

module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: "@storybook/react",
  core: {
    builder: "@storybook/builder-vite",
  },
  async viteFinal(config) {
    const { config: userConfig } = await loadConfigFromFile(
      path.resolve(__dirname, "../vite.config.ts"),
    );
    return mergeConfig(config, {
      ...userConfig,
      plugins: [tsconfigPaths.default()],
    });
  },
};
