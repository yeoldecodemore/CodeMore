import {topClap} from './topClap'

export const overallTopClaps = (obj1, obj2) => {
  const {label1, arr1} = obj1
  const {label2, arr2} = obj2
  const topArr1 = topClap(arr1)
  const topArr2 = topClap(arr2)
  return topArr1.claps > topArr2.claps ? [label1, topArr1] : [label2, topArr2]
}
