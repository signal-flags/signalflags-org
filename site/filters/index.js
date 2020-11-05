// site/filters/index.js

const { DateTime } = require('luxon');

module.exports = {
  readableDate(dateObj) {
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat(
      'dd LLL yyyy'
    );
  },

  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  htmlDateString(dateObj) {
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat('yyyy-LL-dd');
  },

  // Get the first `n` elements of a collection.
  head(array, n) {
    if (n < 0) {
      return array.slice(n);
    }
    return array.slice(0, n);
  },

  min(...numbers) {
    return Math.min.apply(null, numbers);
  },
};
