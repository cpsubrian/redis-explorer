const keysUtils = {

  getTypeName (type) {
    switch (type) {
      case 'string': return 'String'
      case 'list': return 'List'
      case 'set': return 'Set'
      case 'zset': return 'Sorted Set'
      case 'hash': return 'Hash'
    }
  }
}

export default keysUtils
