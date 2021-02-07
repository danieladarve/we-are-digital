module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: {
    mode: "all",
    content: [
      "./src/client/components/*.{vue,js,jsx,ts,tsx}",
      "./src/client/components/**/*.{vue,js,jsx,ts,tsx}"
    ],
    options: {
      whitelistPatterns: [
        /-(leave|enter|appear)(|-(to|from|active))$/,
        /^(?!(|.*?:)cursor-move).+-move$/,
        /^router-link(|-exact)-active$/,
        /data-v-.*/,
      ],
    },
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      maxWidth: {
        'modal': '10rem'
      }
    },
  },
  variants: {
    extend: {
      cursor: ['disabled']
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
