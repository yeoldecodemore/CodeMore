import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_CODEWAR_DATA = 'GET_CODEWAR_DATA'

/**
 * INITIAL STATE
 */
const initialState = {}

/**
 * ACTION CREATORS
 */

const getOrders = orders => ({type: GET_ORDERS, orders})

/**
 * THUNK CREATORS
 */

export const fetchOrders = id => async dispatch => {
  const {data} = await axios.get(`/api/orders/${id}`)
  return dispatch(getOrders(data))
}
