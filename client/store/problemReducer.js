import axios from 'axios'

const initialState = {
  allProblems: [],
  allTests: []
}

const GET_ALL_PROBLEMS = 'GET_ALL_PROBLEMS'
const getAllProblems = problems => ({
  type: GET_ALL_PROBLEMS,
  payload: problems
})

const GET_TEST_FOR_PROBLEM = 'GET_TEST_FOR_PROBLEM'
const getTestForProblem = payload => ({
  type: GET_TEST_FOR_PROBLEM,
  payload
})

export const fetchAllProblems = () => async dispatch => {
  try {
    const {data} = await axios.get(`/api/problems/`)
    dispatch(getAllProblems(data))
  } catch (error) {
    console.error(error)
  }
}
export const fetchAllTests = () => async dispatch => {
  try {
    const {data} = await axios.get(`/api/problems/allTests/`)
    dispatch(getTestForProblem(data))
  } catch (error) {
    console.error(error)
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_PROBLEMS:
      return {
        ...state,
        allProblems: [...action.payload]
      }
    case GET_TEST_FOR_PROBLEM:
      return {...state, allTests: [...action.payload]}
    default:
      return state
  }
}
