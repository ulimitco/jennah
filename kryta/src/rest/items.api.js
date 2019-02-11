import { get, post, destroy } from '../rest'

export let _getItems = (callback = null) => {
  get('/api/v1/items')
    .then(response => {
      if (callback) callback(response.data)
    })
    .catch(e => {
      console.log('Error in _getItems', e)
    })
}

export let _saveItem = (data, callback = null) => {
  console.log('_saveItem called')
  post('/api/v1/item', data)
    .then(response => {
      if (callback) callback(response.data)
    })
    .catch(e => {
      console.log('Error in _saveItem', e)
    })
}

export let _deleteItem = (itemId, callback = null) => {
  console.log('_deleteItem called')
  destroy(`/api/v1/item/${itemId}`)
    .then(response => {
      if (callback) callback(response.data)
    })
    .catch(e => {
      console.log('Error in _deleteItem', e)
    })
}
