/* eslint-disable no-case-declarations */
import axios from 'axios'

const initialState = {
  generalCodewars: {},
  codewarsLanguages: [],
  codewarsQuestions: []
}

const GET_CODEWAR = 'GET_CODEWAR'
const getCodewars = codewarData => ({type: GET_CODEWAR, codewarData})

export const fetchInitialCodewars = (userId, codewars) => async dispatch => {
  console.log('inside thunk')
  const {data} = await axios.get(`/api/data/codewars/${userId}/${codewars}`)
  return dispatch(getCodewars(data))
}
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CODEWAR:
      const {
        generalCodewars,
        codewarsLanguages,
        codewarsQuestions
      } = action.codewarData
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
