import {sortByVal} from './sortByVal'

export const topStackBadges = (badges, max) =>
  sortByVal(badges, 'award_count').slice(0, max)
