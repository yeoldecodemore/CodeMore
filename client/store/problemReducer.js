import axios from 'axios'

const initialState = {
  allProblems: [],
  singleProblem: {},
  allTests: []
}

const GET_ALL_PROBLEMS = 'GET_ALL_PROBLEMS'
const getAllProblems = problems => ({
  type: GET_ALL_PROBLEMS,
  payload: problems
})

const GET_SINGLE_PROBLEM = 'GET_SINGLE_PROBLEM'
const getSingleProblem = singleProblem => ({
  type: GET_SINGLE_PROBLEM,
  payload: singleProblem
})

const GET_TEST_FOR_PROBLEM = 'GET_TEST_FOR_PROBLEM'
const getTestForProblem = payload => ({
  type: GET_TEST_FOR_PROBLEM,
  payload
})

export const fetchSingleProblem = problemName => async dispatch => {
  try {
    const {data} = await axios.get(`/api/problems/${problemName}`)
    dispatch(getSingleProblem(data))
  } catch (error) {
    console.error(error)
  }
}

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
    console.log('tests data in thunk', data)
    dispatch(getTestForProblem(data))
  } catch (error) {
    console.error(error)
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_SINGLE_PROBLEM:
      return {
        ...state,
        singleProblem: {
          ...action.payload,
          tests: state.allTests.filter(
            test => action.payload.id === test.problemId
          )
        }
      }
    case GET_ALL_PROBLEMS:
      return {
        ...state,
        allProblems: [...action.payload],
        singleProblem: [...action.payload][0]
      }
    case GET_TEST_FOR_PROBLEM:
      return {...state, allTests: [...action.payload]}
    default:
      return state
  }
}
