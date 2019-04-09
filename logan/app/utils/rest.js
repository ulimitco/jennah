import axios from 'axios'
import storage from './storage'
import Realm from '../datastore'

const baseURL = 'http://localhost:8080'

let authObject = Realm.objects('Auth')

let instance = axios.create({
  baseURL: baseURL,
})

export const login = (path, params) => {
  return instance.post(path, params)
}

export const get = (path, params) => {
  instance.defaults.headers.common['Authorization'] = 'Bearer ' + authObject[0].access_token
  return instance.get(path, params)
}

export const post = (path, body, config) => {
  instance.defaults.headers.common['Authorization'] = 'Bearer ' + authObject[0].access_token
  instance.defaults.headers.post['Content-Type'] = 'application/json';
  return instance.post(path, body || {}, config)
}

export const destroy = (path, config) => {
  instance.defaults.headers.common['Authorization'] = 'Bearer ' + authObject[0].access_token
  return instance.delete(path, config)
}
