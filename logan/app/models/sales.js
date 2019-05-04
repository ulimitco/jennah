import * as rest from '../utils/rest'
import _ from 'lodash'

export default {
	namespace: 'sales',
	state: {
		items: []
	},
	reducers: {
		updateState(state, {payload}) {
			return {...state, ...payload}
		},
	},
	effects: {
		* createOrder({payload, callback = null}, {call, put}) {

		},
		* getItems({payload, callback = null}, {call, put}) {
			rest.get('/api/v1/items').then(response => {
				if (!_.isEmpty(response.data)) {
					if (callback)
						callback(response.data)
				} else {
					this.setState({wrongPassword: true})

				}
			}).catch(e => {
				console.log('Error: ', e)
			})
		},
		* getSales({callback = null}, {call, put}) {
			rest.get('/api/v1/sales').then(response => {
				if (!_.isEmpty(response.data)) {

					console.log(response)

					if (callback)
						callback(response.data)

				} else {
					this.setState({wrongPassword: true})

				}
			}).catch(e => {
				console.log('Error: ', e)
			})
		},
		* getModifiers({payload, callback = null}, {call, put}) {
			rest.get('/api/v1/modifiers').then(response => {
				if (!_.isEmpty(response.data)) {
					if (callback)
						callback(response.data)
				} else {
					this.setState({wrongPassword: true})
				}
			}).catch(e => {
				console.log('Error: ', e)
			})
		},
		* saveOrder({payload, callback = null}, {call, put}) {
			rest.post('/api/v1/sale', payload).then(response => {

				if (!_.isEmpty(response.data)) {

					if (callback)
						callback(response.data)

				} else {
					this.setState({wrongPassword: true})
				}
			}).catch(e => {
				console.log('Error: ', e)
			})
		},
		subscriptions: {
			setup({dispatch}) {
				dispatch({type: 'loadStorage'})
			},
		},
	}
}
