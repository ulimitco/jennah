import { get, post, destroy } from '../rest'

export let _getUsers = (callback = null) => {
  console.log('_getUsers called')
  get('/api/v1/users')
    .then(response => {
      if (callback) callback(response.data)
    })
    .catch(e => {
      console.log('Error in _getUsers', e)
    })
}

export let _saveUser = (data, callback = null) => {
  console.log('_saveUser called')
  post('/api/v1/user', data)
    .then(response => {
      if (callback) callback(response.data)
    })
    .catch(e => {
      console.log('Error in _saveUser', e)
    })
}

export let _deleteUser = (userId, callback = null) => {
  console.log('_deleteUser called')
  destroy(`/api/v1/user/${userId}`)
    .then(response => {
      if (callback) callback(response.data)
    })
    .catch(e => {
      console.log('Error in _deleteUser', e)
    })
}
