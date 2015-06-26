import _ from 'underscore'

/**
 * Debounce decorator.
 *
 * Use like:
 *
 *   @debounce(250)
 *   function myFunction () {
 *     // Probably does something.
 *   }
 */
const debounce = function (delay, immediate = false) {
  return function (target, name, descriptor) {
    descriptor.value = _.debounce(descriptor.value, delay, immediate)
    return descriptor
  }
}

export default debounce
