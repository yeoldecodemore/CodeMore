/* eslint-disable no-case-declarations */
import axios from 'axios'

const initialState = {
  generalCodewars: {},
  codewarsLanguages: [],
  codewarsQuestions: []
}

const GET_HACKERNOON = 'GET_HACKERNOON'
const getHackernoon = hackernoonData => ({type: GET_HACKERNOON, hackernoonData})

export const fetchInitialCodewar = (userId, hackernoon) => async dispatch => {
  console.log('inside thunk')
  const {data} = await axios.get(`/api/hackernoon/${userId}/${hackernoon}`)
  return dispatch(getHackernoon(data))
}
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_HACKERNOON:
      return {
        ...state,
        generalCodewars,
        codewarsLanguages,
        codewarsQuestions
      }

    default:
      return state
  }
}
