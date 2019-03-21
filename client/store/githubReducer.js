/* eslint-disable no-case-declarations */
import axios from 'axios'

const initialState = {
  repos: [],
  commits: []
}

const GET_GITHUB = 'GET_GITHUB'
const getGithub = githubData => ({
  type: GET_GITHUB,
  githubData
})

export const fetchInitialGithub = (userId, github) => async dispatch => {
  console.log('inside thunk')
  const {data} = await axios.get(`/api/data/stackoverflow/${userId}/${github}`)
  return dispatch(getGithub(data))
}
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_GITHUB:
      const {repos, commits} = action.githubData
      return {
        ...state,
        repos,
        commits
      }

    default:
      return state
  }
}
