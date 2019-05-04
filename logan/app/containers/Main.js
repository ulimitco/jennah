import React, {Component} from 'react'
import {ScrollView, Text, TouchableOpacity, View} from 'react-native'
import {connect} from 'react-redux'
import {Badge, Icon, ListItem} from 'react-native-elements'

import {JLayout} from '../components'

import {NavigationActions} from '../utils'
import _ from 'lodash'
import moment from 'moment'

@connect(({app}) => ({...app}))
class Main extends Component {
	state = {
		search: '',
		orders: []
	}

	componentDidMount() {
		this.fetchData()
	}

	updateSearch = search => {
		this.setState({search});
	}

	fetchData = () => {
		this.props.dispatch({
			type: 'sales/getSales',
			callback: (salesList) => {

				this.setState({ orders: salesList })
			}
		})
	}

	goTo = (routeName, params = null) => {
		this.props.dispatch(NavigationActions.navigate({routeName, params: {
			callback: this.fetchData
		}}))
	}

	viewItem = (item) => {
		this.goTo('OrderView', item)
	}

	render() {

		return (
			<JLayout unpad>

				<TouchableOpacity onPress={() => this.goTo('CreateOrder')} style={{margin: 3}}>
					<View style={{
						backgroundColor: 'rgba(229, 0, 76, 0.7)',
						padding: 15,
						borderWidth: 1,
						borderColor: '#fff',
						borderRadius: 5,
						flexDirection: 'row'
					}}>
						<Text style={{fontFamily: 'OpenSans-Semibold', fontSize: 30, color: 'white'}}>New Order</Text>
						<Icon name='arrow-right' type='feather' color='#fff' size={30}
								iconStyle={{marginTop: 3, alignSelf: 'flex-end'}}/>
					</View>
				</TouchableOpacity>

				<ScrollView>

					<View style={{marginTop: 20, marginBottom: 20, marginLeft: 20}}>
						<Text style={{fontFamily: 'OpenSans-Semibold', fontSize: 20}}>Today's Pickup</Text>
					</View>


					{
						_.map(this.state.orders, (item, i) => {
							return <ListItem
								key={i}
								onPress={() => this.viewItem(item)}
								title={<Text style={{fontWeight: 'bold', color: '#2d2d2d', fontSize: 18}}>{
									_.map(item.Items, (itemR, idx) => {
										if(idx === 0)
											return itemR.qty + " " + itemR.item
										else
											return "," + itemR.qty + " " + itemR.item
									})
								}</Text>}
								subtitle={<View>
									<View>
										<Text style={{fontSize: 16}}>{item.Order.sale_details}</Text>
									</View>
									<View>
										<Text style={{fontSize: 16}}>Pickup {moment(item.Order.sale_dispense_datetime).format("HH:mmA")} at {item.sale_dispense_location}</Text>
									</View>
								</View>}
								bottomDivider
								leftElement={
									<View style={{alignItems: 'center'}}>
										<View style={{justifyContent: 'flex-start'}}><Text
											style={{fontWeight: 'bold', color: 'red'}}>{moment(item.Order.sale_dispense_datetime).format("MMM")}</Text></View>
										<View><Text>{moment(item.Order.sale_dispense_datetime).format("DD")}</Text></View>
									</View>
								}
								rightElement={() => {
									let type = 'success'

									switch (item.status) {
										case 'pending':
											type = 'warning';
											break
										default:
											type = 'success'
									}

									return <Badge value={item.status} status={type}/>
								}}
							/>
						})
					}

				</ScrollView>

			</JLayout>
		)
	}
}

export default Main
