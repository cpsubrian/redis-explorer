import _ from 'underscore'

/**
 * Debounce decorator.
 *
 * Use like:
 *
 *   @debounce(250)
 *   myFunction () {
 *     // Probably does something.
 *   }
 */
function debounce (delay, immediate = true) {
  return function debounceDecorator (target, name, descriptor) {
    descriptor.value = _.debounce(descriptor.value, delay, immediate)
    return descriptor
  }
}

export default debounce
