/* eslint-disable no-case-declarations */
import axios from 'axios'

const initialState = {
  hackernoonPosts: []
}

const GET_HACKERNOON = 'GET_HACKERNOON'
const getHackernoon = hackernoonPosts => ({
  type: GET_HACKERNOON,
  hackernoonPosts
})

export const fetchInitialHackernoon = (
  userId,
  hackernoon
) => async dispatch => {
  console.log('inside thunk')
  const {data} = await axios.get(`/api/hackernoon/${userId}/${hackernoon}`)
  return dispatch(getHackernoon(data))
}
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_HACKERNOON:
      return {
        ...state,
        hackernoonPosts: action.hackernoonPosts
      }

    default:
      return state
  }
}
