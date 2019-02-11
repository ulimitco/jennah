import { get, post, destroy } from '../rest'

export let _getSuppliers = (callback = null) => {
  get('/api/v1/suppliers')
    .then(response => {
      if (callback) callback(response.data)
    })
    .catch(e => {
      console.log('Error in _getSuppliers', e)
    })
}

export let _saveSupplier = (data, callback = null) => {
  console.log('_saveSupplier called')
  post('/api/v1/supplier', data)
    .then(response => {
      if (callback) callback(response.data)
    })
    .catch(e => {
      console.log('Error in _saveSupplier', e)
    })
}

export let _deleteSupplier = (supplierId, callback = null) => {
  console.log('_deleteSupplier called')
  destroy(`/api/v1/supplier/${supplierId}`)
    .then(response => {
      if (callback) callback(response.data)
    })
    .catch(e => {
      console.log('Error in _deleteSupplier', e)
    })
}
