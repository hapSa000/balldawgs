const {plugin} = require('twrnc');

module.exports = {
  // theme: {
  //   screens: {
  //     sm: '380px',
  //     md: '420px',
  //     lg: '680px',
  //     // or maybe name them after devices for `tablet:flex-row`
  //     tablet: '1024px',
  //   },
  // },
  plugins: [
    plugin(({addUtilities}) => {
      addUtilities({
        'bg-custom': {
          backgroundColor: `#4CAF50`,
        },
        'bg-redtheame': {
          backgroundColor: `#5C0A0A`,
        },

      });
    }),
  ],
};
