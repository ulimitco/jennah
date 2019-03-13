import { createAction, NavigationActions } from '../utils'
import * as rest from '../utils/rest'
import storage from '../utils/storage';
import Realm from '../datastore'
import uuid from 'uuid/v1'
import _ from 'lodash'

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

      rest.get('/api/v1/items').then(response => {

        if(!_.isEmpty(response.data)){
          if(callback)
            callback(response.data)
        } else {
          this.setState({ wrongPassword: true })

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
