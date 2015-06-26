const regex = {

  escape (s) {
    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
  },

  fromGlob (s) {
    let converted = s
      .split('*')
      .map((part) => {
        return regex.escape(part)
      })
      .map((part) => {
        return '(' + part + ')'
      })
      .join('(.*)')

    return new RegExp('^' + converted, 'g')
  }
}

export default regex
