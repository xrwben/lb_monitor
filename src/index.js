import error from './error.js'

export default {
  init (options) {
    console.log('--->>', options)
    error(options)
  }
}