import { get, post, destroy } from '../rest'

export let _getBranches = (callback = null) => {
  get('/api/v1/branches')
    .then(response => {
      if (callback) callback(response.data)
    })
    .catch(e => {
      console.log('Error in _getBranches', e)
    })
}

export let _saveBranch = (data, callback = null) => {
  console.log('_saveBranch called')
  post('/api/v1/branch', data)
    .then(response => {
      if (callback) callback(response.data)
    })
    .catch(e => {
      console.log('Error in _saveBranch', e)
    })
}

export let _deleteBranch = (branchId, callback = null) => {
  console.log('_deleteBranch called')
  destroy(`/api/v1/branch/${branchId}`)
    .then(response => {
      if (callback) callback(response.data)
    })
    .catch(e => {
      console.log('Error in _deleteBranch', e)
    })
}
