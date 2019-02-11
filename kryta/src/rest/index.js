import axios from 'axios'
import { IP_ADDRESS } from '../components/Utils/RouterAction'

const auth0BaseUrl = 'http://' + IP_ADDRESS

let instance = axios.create({
  baseURL: auth0BaseUrl,
})

export const get = (path, params, config) => {
  instance.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')
  return instance.get(path, params, config)
}

export const post = (path, body, config) => {
  instance.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')
  return instance.post(path, body || {}, config)
}

export const destroy = (path, config) => {
  instance.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')
  return instance.delete(path, config)
}
