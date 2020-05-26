export default {
  sanitizeString (s) {
    s = s.replace(/\s+/g, ' ')
    s = s.replace(/#+/g, '#')
    s = s.replace(/@+/g, '@')
    s = s.replace('`', '')
    s = s.replace(/(<([^>]+)>)/ig, '')
    return s
  },
  parseString (s) {
    if (s.trim() === '') { return false }
    const inputString = this.sanitizeString(s)
    const w = inputString.split(' ')
    const restSearchString = this.blocksToRestString(w)
    return {
      restString: restSearchString,
      blocks: w
    }
  },
  blocksToRestString (w) {
    const fullString = []
    const tags = []
    const authors = []
    w = Array.from(new Set(w))
    for (const word of w) {
      if (word[0] === '#') {
        tags.push(word.replace('#', ''))
        continue
      }
      if (word[0] === '@') {
        authors.push(word.replace('@', ''))
        continue
      }
      fullString.push(word)
    }
    let restSearchString = '/s?'

    if (fullString.length > 0) {
      restSearchString += ('&w=' + fullString.join(','))
    }

    if (tags.length > 0) {
      restSearchString += ('&t=' + tags.join(','))
    }

    if (authors.length > 0) {
      restSearchString += ('&a=' + authors.join(','))
    }
    if (restSearchString === 's?') { return false }

    return restSearchString
  }
}
