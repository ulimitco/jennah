import * as types from '../constants/datesActionTypes'
import update from 'react-addons-update'
import moment from 'moment'
import { twentyFourFormat } from 'constants/dateFormat'

const INITIAL_STATE = {
  branch: '',
  fromDate: moment()
    .subtract(2, 'months')
    .toISOString(),
  toDate: moment().toISOString(),
}

export default function datesreducers(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case types.CHANGE_FROM: {
      return update(state, {
        fromDate: { $set: moment(action.from).toISOString() },
      })
    }

    case types.CHANGE_TO: {
      return update(state, {
        toDate: { $set: moment(action.to).toISOString() },
      })
    }

    case types.SET_BRANCH: {
      return update(state, {
        toDate: { $set: action.branch },
      })
    }

    default:
      return state
  }
}
