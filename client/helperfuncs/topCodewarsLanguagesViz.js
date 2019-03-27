import {topCodewarsLanguages} from './topCodewarsLanguages'
import {mapIcon} from './mapIcon'

export const topCodewarsLanguagesViz = (languages, max) =>
  topCodewarsLanguages(languages, max).map(mapIcon)
