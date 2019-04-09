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
    fetching: false
  },
  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload }
    },
  },
  effects: {
    *login({ payload, callback = null }, { call, put }) {

      yield put(createAction('updateState')({ fetching: true }))

      rest.login('/login?username=' + payload.username + '&password=' + payload.password).then(response => {
        if (response.data.response.status === 200) {

          Realm.write(() => {

            let authObject = Realm.objects('Auth')
            Realm.delete(authObject)
            
            Realm.create('Auth', {
              id: uuid(),
              access_token: response.data.response.access_token
            })
          })

          if(callback)
            callback()

        } else {
          if(callback)
            callback()
        }
      }).catch(e => {
        console.log('Error: ', e)
      })
      
    },
    *logout({ call, put }) {
      Realm.write(() => {
        let authObject = Realm.objects('Auth')
        Realm.delete(authObject)
      })

      createAction('updateState')({ isLogged: false })
    },
  },
  subscriptions: {
    setup({ dispatch }) {
      dispatch({ type: 'loadStorage' })
    },
  },
}
