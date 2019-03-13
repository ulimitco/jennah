import { createAction, NavigationActions } from '../utils'
import * as authService from '../services/auth'
import * as rest from '../utils/rest'
import storage from '../utils/storage';
import Realm from '../datastore'
import uuid from 'uuid/v1'

export default {
  namespace: 'app',
  state: {
    login: false,
    loading: true,
    fetching: false,
  },
  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload }
    },
  },
  effects: {
    *loadStorage(action, { call, put }) {
      //const login = yield call(Storage.get, 'login', false)
      //yield put(createAction('updateState')({ login, loading: false }))
    },
    *login({ payload, callback = null }, { call, put }) {

      yield put(createAction('updateState')({ fetching: true }))

      rest.login('/login?username=' + payload.username + '&password=' + payload.password).then(response => {
        if (response.data.response.status === 200) {
          
          Realm.write(() => {
            Realm.create('Auth', {
              id: uuid(),
              access_token: response.data.response.access_token
            })
          })

          createAction('updateState')({ login: true, fetching: false })

          if(callback)
            callback()
        } else {
          this.setState({ wrongPassword: true })
          if(callback)
            callback()
        }
      }).catch(e => {
        console.log('Error: ', e)
      })
      
    },
    *logout(action, { call, put }) {
      yield call(Storage.set, 'login', false)
      yield put(createAction('updateState')({ login: false }))
    },
  },
  subscriptions: {
    setup({ dispatch }) {
      dispatch({ type: 'loadStorage' })
    },
  },
}
