/**
 * @param {number} n
 * @return {string}
 */
var concatHex36 = function (n) {
  return ((n * n).toString(16) + (n * n * n).toString(36)).toUpperCase()
}
