import {sortByVal} from './sortByVal'

export const codewarsLanguagesViz = languages =>
  sortByVal(languages, 'languageRankScore')
    .slice(0, 5)
    .map(val => val.languageName)

//top five ordered languages names
