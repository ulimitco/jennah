import { combineReducers } from 'redux'
import datesreducers from './datesreducers'

const rootReducer = combineReducers({
  dates: datesreducers,
})

export default rootReducer
