import {sortByVal} from './sortByVal'
import {sanitizeDate} from './sanitizeDate'
export const createDate = (posts, value) =>
  posts.length ? sanitizeDate(new Date(sortByVal(posts, value)[0][value])) : 0
