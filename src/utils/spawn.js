/**
 * ES7-like async via a wrapped generator function.
 * Inside the function you can yield Promises.
 */
function spawn (genF) {
  return new Promise((resolve, reject) => {
    let gen = genF()
    let step = (nextF) => {
      let next
      try {
        next = nextF()
      } catch(e) {
        // Finished with failure, reject the promise.
        reject(e)
        return
      }
      if (next.done) {
        // Finished with success, resolve the promise.
        resolve(next.value)
        return
      }
      // Not finished, chain off the yielded promise and `step` again.
      Promise
        .cast(next.value)
        .then((v) => {
          step(() => gen.next(v))
        }, (e) => {
          step(() => gen.throw(e))
        })
    }
    step(() => gen.next(undefined))
  })
}

export default spawn
