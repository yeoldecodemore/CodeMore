/* eslint-disable no-case-declarations */
import axios from 'axios'
import {ToastsStore} from 'react-toasts'
const initialState = {
  mediumPosts: []
}

const GET_MEDIUM = 'GET_MEDIUM'
const getMedium = mediumPosts => ({
  type: GET_MEDIUM,
  mediumPosts
})

export const fetchMedium = (userId, medium) => async dispatch => {
  try {
    ToastsStore.success(`Fetched data for Medium!`)
    const {data} = await axios.get(`/api/medium/${userId}/${medium}`)
    return dispatch(getMedium(data))
  } catch (error) {
    ToastsStore.error(`${error} while fetching Medium!`)
  }
}

export const findMedium = userId => async dispatch => {
  const {data} = await axios.get(`/api/medium/${userId}`)
  return dispatch(getMedium(data))
}
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_MEDIUM:
      return {
        ...state,
        mediumPosts: action.mediumPosts
      }

    default:
      return state
  }
}
