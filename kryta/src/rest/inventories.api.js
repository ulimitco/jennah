import { get, post, destroy } from '../rest'

export let _getInventories = (callback = null) => {
  get('/api/v1/inventories')
    .then(response => {
      if (callback) callback(response.data)
    })
    .catch(e => {
      console.log('Error in _getInventories', e)
    })
}

export let _saveInventory = (data, callback = null) => {
  console.log('_saveInventory called')
  post('/api/v1/inventory', data)
    .then(response => {
      if (callback) callback(response.data)
    })
    .catch(e => {
      console.log('Error in _saveInventory', e)
    })
}

export let _saveInventories = (data, callback = null) => {
  console.log('_saveInventories called')
  post('/api/v1/inventories', data)
    .then(response => {
      if (callback) callback(response.data)
    })
    .catch(e => {
      console.log('Error in _saveInventories', e)
    })
}

export let _deleteInventory = (inventoryId, callback = null) => {
  console.log('_deleteInventory called')
  destroy(`/api/v1/inventory/${inventoryId}`)
    .then(response => {
      if (callback) callback(response.data)
    })
    .catch(e => {
      console.log('Error in _deleteInventory', e)
    })
}
