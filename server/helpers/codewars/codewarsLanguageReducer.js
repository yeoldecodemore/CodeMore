const _codewarsLanguageReducer = (languages, id) => [
  Object.keys(languages).reduce((accum, curr) => {
    const {rank, name, color, score} = languages[curr]
    const newObj = {
      languageName: curr,
      languageRank: rank,
      languageRankName: name,
      languageRankColor: color,
      languageRankScore: score,
      codewarId: id
    }

    accum.push(newObj)
    return accum
  }, [])
]

module.exports = _codewarsLanguageReducer
