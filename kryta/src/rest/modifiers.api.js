import { get, post, destroy } from '../rest'

export let _getModifiers = (callback = null) => {
  get('/api/v1/modifiers')
    .then(response => {
      if (callback) callback(response.data)
    })
    .catch(e => {
      console.log('Error in _getModifiers', e)
    })
}

export let _saveModifier = (data, callback = null) => {
  console.log('_saveModifier called')
  post('/api/v1/modifier', data)
    .then(response => {
      if (callback) callback(response.data)
    })
    .catch(e => {
      console.log('Error in _saveModifier', e)
    })
}

export let _deleteModifier = (modifierId, callback = null) => {
  console.log('_deleteModifier called')
  destroy(`/api/v1/modifier/${modifierId}`)
    .then(response => {
      if (callback) callback(response.data)
    })
    .catch(e => {
      console.log('Error in _deleteModifier', e)
    })
}
