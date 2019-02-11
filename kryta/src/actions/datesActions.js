import * as types from '../constants/datesActionTypes'

export let changeStartDate = from => {
  return dispatch => {
    dispatch(changeFromDate(from))
  }
}

export let changeEndDate = to => {
  return dispatch => {
    dispatch(changeToDate(to))
  }
}

export let changeFromDate = from => {
  return {
    type: types.CHANGE_FROM,
    from,
  }
}

export let changeToDate = to => {
  return {
    type: types.CHANGE_TO,
    to,
  }
}
