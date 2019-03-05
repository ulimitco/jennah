import axios from 'axios'

const baseURL = 'http://localhost:8080'

let instance = axios.create({
  baseURL: baseURL,
})

export const login = (path, params) => {
  return instance.post(path, params)
}

export const get = (path, params, config) => {
  //instance.defaults.headers.common['Authorization'] = 'Bearer ' + Storage.get('access_token')
  return instance.get(path, params, config)
}

export const post = (path, body, config) => {
  //instance.defaults.headers.common['Authorization'] = 'Bearer ' + Storage.get('access_token')
  return instance.post(path, body || {}, config)
}

export const destroy = (path, config) => {
  //instance.defaults.headers.common['Authorization'] = 'Bearer ' + Storage.get('access_token')
  return instance.delete(path, config)
}
