/* eslint-disable no-case-declarations */
import axios from 'axios'
import {ToastsStore} from 'react-toasts'
const initialState = {
  generalStack: {},
  stackBadges: [],
  stackTags: [],
  stackBadgenetwork: [],
  stackPrivileges: [],
  stackDailyRep: []
}

const GET_STACKOVERFLOW = 'GET_STACKOVERFLOW'
const getStackoverflow = stackoverflowData => ({
  type: GET_STACKOVERFLOW,
  stackoverflowData
})

export const fetchStackoverflow = (userId, stackoverflow) => async dispatch => {
  try {
    ToastsStore.success(`Fetched data for Stackoverflow!`)
    const {data} = await axios.get(
      `/api/stackoverflow/${userId}/${stackoverflow}`
    )
    return dispatch(getStackoverflow(data))
  } catch (error) {
    ToastsStore.error(`${error} while fetching Stackoverflow!`)
  }
}

export const findStackoverflow = userId => async dispatch => {
  const {data} = await axios.get(`/api/stackoverflow/${userId}`)
  return dispatch(getStackoverflow(data))
}
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_STACKOVERFLOW:
      const {
        generalStack,
        stackBadges,
        stackTags,
        stackBadgenetwork,
        stackPrivileges,
        stackDailyRep
      } = action.stackoverflowData
      return {
        ...state,
        generalStack,
        stackBadges,
        stackTags,
        stackBadgenetwork,
        stackPrivileges,
        stackDailyRep
      }

    default:
      return state
  }
}
