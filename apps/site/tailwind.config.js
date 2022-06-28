const { join } = require('path');

// available since Nx v 12.5
const { createGlobPatternsForDependencies } = require('@nrwl/next/tailwind');

module.exports = {
  purge: [
    join(__dirname, 'pages/**/*.{js,ts,jsx,tsx}'),
    ...createGlobPatternsForDependencies(__dirname),

  ],
  presets: [require('../../tailwind-workspace-preset.js')],
  darkMode: 'media',
  content: [],
  theme: {
    extend: {},
  },
  plugins: [],
}
