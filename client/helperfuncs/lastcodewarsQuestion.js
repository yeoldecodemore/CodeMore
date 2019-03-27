import {sortByVal} from './sortByVal'

export const lastcodewarsQuestion = (arr, value) =>
  arr.length ? sortByVal(arr, value)[0].questionName : 0
