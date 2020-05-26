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
    let w = inputString.split(' ')
    w = Array.from(new Set(w))
    const fullString = []
    const tags = []
    const authors = []
    for (let i = 0; i < w.length; i++) {
      console.log(w[i])

      if (w[i][0] === '#') {
        tags.push(w[i].replace('#', ''))
        continue
      }
      if (w[i][0] === '@') {
        authors.push(w[i].replace('@', ''))
        continue
      }
      fullString.push(w[i])
    }
    let restSearchString = '/s?'
    console.log(tags)
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

    console.log(restSearchString)

    return {
      restString: restSearchString,
      blocks: w
    }
  }
}
