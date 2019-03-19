/* eslint-disable complexity */

const initialState = {
  codewars: '',
  email: '',
  hackernoon: '',
  medium: '',
  stackoverflow: ''
}

const ADD_NEW_CODEWARS = 'ADD_NEW_CODEWARS'
export const addCodewars = codewars => ({type: ADD_NEW_CODEWARS, codewars})

const ADD_NEW_EMAIL = 'ADD_NEW_EMAIL'
export const addEmail = email => ({type: ADD_NEW_EMAIL, email})

const ADD_NEW_HACKERNOON = 'ADD_NEW_HACKERNOON'
export const addHackernoon = hackernoon => ({
  type: ADD_NEW_HACKERNOON,
  hackernoon
})

const ADD_NEW_MEDIUM = 'ADD_NEW_MEDIUM'
export const addMedium = medium => ({
  type: ADD_NEW_MEDIUM,
  medium
})

const ADD_NEW_STACKOVERFLOW = 'ADD_NEW_STACKOVERFLOW'
export const addStackoverflow = stackoverflow => ({
  type: ADD_NEW_STACKOVERFLOW,
  stackoverflow
})
//

//thunks

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_NEW_CODEWARS:
      return {
        ...state,
        codewars: action.codewars
      }
    case ADD_NEW_EMAIL:
      return {
        ...state,
        email: action.email
      }
    case ADD_NEW_HACKERNOON:
      return {
        ...state,
        hackernoon: action.hackernoon
      }
    case ADD_NEW_MEDIUM:
      return {
        ...state,
        medium: action.medium
      }
    case ADD_NEW_STACKOVERFLOW:
      return {
        ...state,
        stackoverflow: action.stackoverflow
      }
    default:
      return state
  }
}
