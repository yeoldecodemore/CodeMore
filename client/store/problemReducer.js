import axios from 'axios'

const GET_ALL_PROBLEMS = 'GET_ALL_PROBLEMS'
const GET_SINGLE_PROBLEM = 'GET_SINGLE_PROBLEM'

const initialState = {
  allProblems: [],
  singleProblem: {}
}

const getAllProblems = problems => ({
  type: GET_ALL_PROBLEMS,
  payload: problems
})

const getSingleProblem = singleProblem => ({
  type: GET_SINGLE_PROBLEM,
  payload: singleProblem
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

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_SINGLE_PROBLEM:
      return {...state, singleProblem: action.payload}
    case GET_ALL_PROBLEMS:
      return {...state, allProblems: [...action.payload], singleProblem: {}}
    default:
      return state
  }
}
