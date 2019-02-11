import { get, post, destroy } from '../rest'

export let _getCategories = (callback = null) => {
  get('/api/v1/categories')
    .then(response => {
      if (callback) callback(response.data)
    })
    .catch(e => {
      console.log('Error in _getCategories', e)
    })
}

export let _saveCategory = (data, callback = null) => {
  console.log('_saveCategory called')
  post('/api/v1/category', data)
    .then(response => {
      if (callback) callback(response.data)
    })
    .catch(e => {
      console.log('Error in _saveCategory', e)
    })
}

export let _deleteCategory = (categoryId, callback = null) => {
  console.log('_deleteCategory called')
  destroy(`/api/v1/category/${categoryId}`)
    .then(response => {
      if (callback) callback(response.data)
    })
    .catch(e => {
      console.log('Error in _deleteCategory', e)
    })
}
