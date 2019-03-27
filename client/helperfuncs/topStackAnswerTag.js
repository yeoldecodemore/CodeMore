import {sortByVal} from './sortByVal'

export const topStackAnswerTag = (arr, val, max) =>
  arr.length ? sortByVal(arr, val).slice(0, max) : []
