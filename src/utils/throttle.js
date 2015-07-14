import _ from 'underscore'

/**
 * Throttle decorator.
 *
 * Use like:
 *
 *   @throttle(250)
 *   myFunction () {
 *     // Probably does something.
 *   }
 */
function throttle (delay, options = {}) {
  return function throttleDecorator (target, name, descriptor) {
    descriptor.value = _.throttle(descriptor.value, delay, options)
    return descriptor
  }
}

export default throttle
