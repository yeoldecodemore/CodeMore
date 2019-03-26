import {sortByVal} from './sortByVal'
export const createDate = (posts, value) => {
  if (posts.length) {
    const date = new Date(sortByVal(posts, value)[0][value])
    return `${date.getUTCMonth() + 1}/${date.getUTCDate() - 1}/${date
      .getUTCFullYear()
      .toString()
      .slice(2, 4)}`
  } else {
    return 0
  }
}
