/* eslint-disable no-case-declarations */
import axios from 'axios'

const initialState = {
  stackUser: {},
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

export const fetchInitialStackoverflow = (
  userId,
  stackoverflow
) => async dispatch => {
  console.log('inside thunk')
  const {data} = await axios.get(
    `/api/data/stackoverflow/${userId}/${stackoverflow}`
  )
  return dispatch(getStackoverflow(data))
}
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_STACKOVERFLOW:
      const {
        stackUser,
        stackBadges,
        stackTags,
        stackBadgenetwork,
        stackPrivileges,
        stackDailyRep
      } = action.stackoverflowData
      return {
        ...state,
        stackUser,
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
