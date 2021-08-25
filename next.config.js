const withTM = require('next-transpile-modules')(['react-timezone-select'])

module.exports = withTM({
  basePath: process.env.NEXT_PUBLIC_BASE_PATH
})