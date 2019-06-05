import { get, post, destroy } from '../rest'

export let _getSales = (callback = null) => {
  get('/api/v1/sales')
    .then(response => {
      if (callback) callback(response.data)
    })
    .catch(e => {
      console.log('Error in _getSales', e)
    })
}

export let _updateSaleStatus = (payload, callback = null) => {
  console.log('_updateSaleStatus called')
  post('/api/v1/update_sale_status', payload)
    .then(response => {
      if (callback) callback(response.data)
    })
    .catch(e => {
      console.log('Error in _updateSaleStatus', e)
    })
}

export let _saveSale = (data, callback = null) => {
  console.log('_saveSale called')
  post('/api/v1/sale', data)
    .then(response => {
      if (callback) callback(response.data)
    })
    .catch(e => {
      console.log('Error in _saveSale', e)
    })
}

export let _deleteSale = (saleId, callback = null) => {
  console.log('_deleteSale called')
  destroy(`/api/v1/sale/${saleId}`)
    .then(response => {
      if (callback) callback(response.data)
    })
    .catch(e => {
      console.log('Error in _deleteSale', e)
    })
}
