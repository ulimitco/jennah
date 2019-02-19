import React, { Component } from 'react'
import { Text, View, ScrollView, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { Icon, ListItem, Badge, Button } from 'react-native-elements'

import { JText, JLayout, JButton } from '../components'

import { NavigationActions } from '../utils'
import _ from 'lodash'

@connect(({ app }) => ({ ...app }))
class Main extends Component {
  state = {
    search: ''
  }

  updateSearch = search => {
    this.setState({ search });
  }

  viewItem = () => {
    this.props.dispatch(NavigationActions.navigate({ routeName: 'OrderView' }))
  }

  render() {

    var ordersList = [
      { id: 1, order: '6" Chocolate Cake', pickupTime: '12:30PM', addon: 'Addon details', status: 'done', pickupLoc: 'Burgos' },
      { id: 2, order: '2" Vanilla Cake', pickupTime: '2:30PM', addon: 'Addon details', status: 'pending', pickupLoc: 'Estrella' },
      { id: 3, order: '3" Red Velvet', pickupTime: '8:00AM', addon: 'Addon details', status: 'pending', pickupLoc: 'Cogon' },
      { id: 4, order: '6" Chocolate Cake', pickupTime: '4:30PM', addon: 'Addon details', status: 'pending', pickupLoc: 'Estrella' },
    ]

    return (
      <JLayout>

        <TouchableOpacity>
          <View style={{ backgroundColor: 'rgba(229, 0, 76, 0.7)', padding: 15, borderWidth: 1, borderColor: '#fff', borderRadius: 5, flexDirection: 'row' }}>
            <Text style={{ fontFamily: 'OpenSans-Semibold', fontSize: 30, color: 'white' }}>New Order</Text>
            <Icon name='arrow-right' type='feather' color='#fff' size={30} iconStyle={{ marginTop: 3, alignSelf: 'flex-end' }} />
          </View>
        </TouchableOpacity>
        
        <ScrollView>

        <View style={{ marginTop: 20, marginBottom: 20 }}>
          <Text style={{ fontFamily: 'OpenSans-Semibold', fontSize: 20 }}>Today's Pickup</Text>
        </View>


          {
            _.map(ordersList, (item, i) => {
              return <ListItem
                key={i}
                onPress={() => this.viewItem(item)}
                title={<Text style={{ fontWeight: 'bold', color: '#2d2d2d', fontSize: 18 }}>{item.order}</Text>}
                subtitle={<View>
                  <View>
                    <Text style={{ fontSize: 16 }}>{item.addon}</Text>
                  </View>
                  <View>
                    <Text style={{ fontSize: 16 }}>Pickup {item.pickupTime} at {item.pickupLoc}</Text>
                  </View>                      
                </View>}
                bottomDivider
                leftElement={
                  <View style={{ alignItems: 'center' }}>
                    <View style={{ justifyContent: 'flex-start' }}><Text style={{ fontWeight: 'bold', color: 'red'}}>JUL</Text></View>
                    <View><Text>15</Text></View>
                  </View>
                }
                rightElement={() => {
                  let type = 'success'
                  
                  switch(item.status){
                    case 'pending': type = 'warning'; break
                    default: type = 'success'
                  }
                  
                  return <Badge value={item.status} status={type} />
                }}
              />
            })
          }


        <View style={{ marginTop: 20, marginBottom: 20 }}>
          <Text style={{ fontFamily: 'OpenSans-Semibold', fontSize: 20 }}>Standing Orders</Text>
        </View>


        {
            _.map(ordersList, (item, i) => {
              return <ListItem
                key={i}
                onPress={() => this.viewItem(item)}
                title={<Text style={{ fontWeight: 'bold', color: '#2d2d2d', fontSize: 18 }}>{item.order}</Text>}
                subtitle={<View>
                  <View>
                    <Text style={{ fontSize: 16 }}>{item.addon}</Text>
                  </View>
                  <View>
                    <Text style={{ fontSize: 16 }}>Pickup {item.pickupTime} at {item.pickupLoc}</Text>
                  </View>                      
                </View>}
                bottomDivider
                leftElement={
                  <View style={{ alignItems: 'center' }}>
                    <View style={{ justifyContent: 'flex-start' }}><Text style={{ fontWeight: 'bold', color: 'red'}}>JUL</Text></View>
                    <View><Text>15</Text></View>
                  </View>
                }
                rightElement={() => {
                  let type = 'success'
                  
                  switch(item.status){
                    case 'pending': type = 'warning'; break
                    default: type = 'success'
                  }
                  
                  return <Badge value={item.status} status={type} />
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
