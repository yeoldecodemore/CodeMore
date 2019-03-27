import {sortByVal} from './sortByVal'
import {sanitizeDate} from './sanitizeDate'

export const gitCommitFunc = arr =>
  sortByVal(arr, 'date').map(val => sanitizeDate(val.date))
