import {sortByVal} from './sortByVal'

export const topCodewarsLanguages = (languages, max) =>
  sortByVal(languages, 'languageRankScore')
    .slice(0, max)
    .map(val => val.languageName.toLowerCase())

//top five ordered languages names
