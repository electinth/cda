const { tailwindExtractor } = require('tailwindcss/lib/lib/purgeUnusedStyles');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: {
    mode: 'all',
    content: ['./src/**/*.svelte', './src/**/*.html'],
    options: {
      defaultExtractor: (content) => [
        ...tailwindExtractor(content),
        // Match Svelte class: directives (https://github.com/tailwindlabs/tailwindcss/discussions/1731)
        ...[...content.matchAll(/(?:class:)*([\w\d-/:%.]+)/gm)].map(
          ([_match, group, ..._rest]) => group
        ),
      ],
      keyframes: true,
    },
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      heading: ['Kondolar Thai', ...defaultTheme.fontFamily.serif],
      subtitle: ['Anuphan', ...defaultTheme.fontFamily.sans],
      body: ['Bai Jamjuri', ...defaultTheme.fontFamily.sans],
    },
    fontSize: {
      h2: ['49px', '64px'],
      h3: ['39px', '48px'],
      h4: ['31px', '40px'],
      h5: ['25px', '32px'],
      h6: ['20px', '20px'],
      body1: ['16px', '24px'],
      body2: ['13px', '20px'],
    },
    extend: {},
  },
  variants: {},
  plugins: [],
};
