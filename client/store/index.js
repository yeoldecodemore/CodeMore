import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import userReducer from './userReducer'
import problemReducer from './problemReducer'
import signupReducer from './signupReducer'
import codewarReducer from './codewarReducer'
import hackernoonReducer from './hackernoonReducer'
import mediumReducer from './mediumReducer'

const reducer = combineReducers({
  userReducer,
  problemReducer,
  signupReducer,
  codewarReducer,
  hackernoonReducer,
  mediumReducer
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './userReducer'
export * from './signupReducer'
export * from './problemReducer'
export * from './hackernoonReducer'
export * from './codewarReducer'
export * from './mediumReducer'
