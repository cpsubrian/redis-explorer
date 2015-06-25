/**
 * ES7-like async via a wrapped generator function.
 * Inside the function you can yield Promises.
 */

function spawn(genF) {
  return new Promise(function(resolve, reject) {
    let gen = genF();
    function step(nextF) {
      let next;
      try {
        next = nextF();
      } catch(e) {
        // finished with failure, reject the promise
        reject(e);
        return;
      }
      if(next.done) {
        // finished with success, resolve the promise
        resolve(next.value);
        return;
      }
      // not finished, chain off the yielded promise and `step` again
      Promise.cast(next.value).then(function(v) {
        step(function() { return gen.next(v); });
      }, function(e) {
        step(function() { return gen.throw(e); });
      });
    }
    step(function() { return gen.next(undefined); });
  });
}

export default spawn;