export default {
  version: {
    number: '0.3',
    text: 'ALPHA VER ',
    name() {
      return `${this.text}${this.number}`;
    },
  },
};
