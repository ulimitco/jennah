import { createAction, NavigationActions } from '../utils'
import * as rest from '../utils/rest'
import storage from '../utils/storage';
import Realm from '../datastore'
import uuid from 'uuid/v1'

export default {
  namespace: 'sales',
  state: {
    items: []
  },
  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload }
    },
  },
  effects: {
    *createOrder({ payload, callback = null }, { call, put }) {
      
    },
    *getItems({ payload, callback = null }, { call, put }) {
      
      let productList = [
        { id: 13, item: 'Chocolate Cake' },
        { id: 14, item: 'Vanilla Cake' },
        { id: 15, item: 'Red Velvet' },
        { id: 16, item: 'Hershey Cake' },
      ]

      rest.get('/items').then(response => {
        if (response.data.response.status === 200) {
          
        } else {
          this.setState({ wrongPassword: true })
          if(callback)
            callback()
        }
      }).catch(e => {
        console.log('Error: ', e)
      })

    },
  },
  subscriptions: {
    setup({ dispatch }) {
      dispatch({ type: 'loadStorage' })
    },
  },
}
