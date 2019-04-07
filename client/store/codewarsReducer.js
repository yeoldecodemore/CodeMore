import axios from 'axios'
import {ToastsStore} from 'react-toasts'
const initialState = {
  generalCodewars: {},
  codewarsLanguages: [],
  codewarsQuestions: []
}

const GET_CODEWAR = 'GET_CODEWAR'
const getCodewars = codewarsData => ({type: GET_CODEWAR, codewarsData})

export const fetchCodewars = (userId, codewars) => async dispatch => {
  try {
    ToastsStore.success(`Fetched data for Codewars!`)
    console.log('fetchcodewars')
    const {data} = await axios.get(`/api/codewars/${userId}/${codewars}`)
    return dispatch(getCodewars(data))
  } catch (error) {
    ToastsStore.error(`${error} while fetching Codewars!`)
  }
}

export const findCodewars = userId => async dispatch => {
  const {data} = await axios.get(`/api/codewars/${userId}`)
  return dispatch(getCodewars(data))
}
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CODEWAR:
      const {
        generalCodewars,
        codewarsLanguages,
        codewarsQuestions
      } = action.codewarsData
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
