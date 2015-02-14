var assign = require('object-assign');

function styleSet(...styles) {
  styles = styles.filter(v => !!v);
  return assign.apply(null, [{}].concat(styles));
}

module.exports = styleSet;
