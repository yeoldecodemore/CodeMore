/* eslint-disable no-case-declarations */
import axios from 'axios'
import {ToastsStore} from 'react-toasts'
const initialState = {
  repos: [],
  commits: []
}

const GET_GITHUB = 'GET_GITHUB'
const getGithub = githubData => ({
  type: GET_GITHUB,
  githubData
})

export const fetchGithub = (userId, github) => async dispatch => {
  try {
    ToastsStore.success(`Fetched data for Github!`)
    const {data} = await axios.get(`/api/github/${userId}/${github}`)
    return dispatch(getGithub(data))
  } catch (error) {
    ToastsStore.error(`${error} while fetching Github!`)
  }
}

export const findGithub = userId => async dispatch => {
  const {data} = await axios.get(`/api/github/${userId}`)
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
