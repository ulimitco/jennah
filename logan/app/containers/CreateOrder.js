import React, { Component } from 'react'
import { Text, View, TouchableOpacity, ScrollView, Alert } from 'react-native'
import { Icon } from 'react-native-elements'
import { connect } from 'react-redux'

import { JLayout } from '../components'

import { NavigationActions } from '../utils'
import _ from 'lodash'
import moment from 'moment'
import Realm from '../datastore'
import uuidv1 from 'uuid/v1'

@connect(({ app }) => ({ ...app }))
class CreateOrder extends Component {
   state = {
      
      itemsList: [],
      modifiersList: [],
      branchList: [],
      
      selectedItem: '',
      selectedBranch: '',
      showSelector: false,
      
      selectorItems: [],
      selectorFieldname: '',
      selectorParentID: '',
      
      onItemPress: '',
      
      date: new Date(),
      order: {},
      orderItems: []
   }
  
   componentDidMount () {
      this.refreshOrder()
   }

   refreshOrder = () => {
      let orders = Realm.objects('Order')
      let order = _.head(orders)

      let orderItems = Realm.objects('OrderItem')

      if(!_.isEmpty(order)){
         this.setState({ order, orderItems })
      }
   }
  
   getItemsList = () => {
      this.props.dispatch({
         type: 'sales/getItems',
         callback: (productList) => {
            let itemsList = _.map(productList, item => {
               item.selected = false
               return item
            })
            
            this.setState({ itemsList })
         }
      })
   }
  
   getModifiersList = () => {
      this.props.dispatch({
         type: 'sales/getModifiers',
         payload: {},
         callback: (sidesList) => {
            let modifiersList = _.map(sidesList, item => {
               item.selected = false
               return item
            })
         
            this.setState({ modifiersList })
         }
      })
   }
  
   itemSelect = () => {
      this.setState({ 
      selectorItems: this.state.itemsList, 
      selectorFieldname: 'item', 
      onItemPress: this.onItemSelect,
      showSelector: true 
      })
   }

   onItemSelect = (item) => {
      let itemsList = _.map(this.state.itemsList, record => {
      
      if(record.id === item.id)
         item.selected = true
         return record
      })
      
      this.setState({ itemsList, selectedItem: item.item, showSelector: false })
   }
  
   branchSelect = () => {
      this.setState({ 
         selectorItems: this.state.branchList, 
         selectorFieldname: 'branch', 
         onItemPress: this.onBranchSelect,
         showSelector: true 
      })
   }
  
   onBranchSelect = (item) => {
      this.setState({ selectedBranch: item.branch, showSelector: false })
   }
  
   modifierSelect = (item) => {
      this.setState({ 
         selectorParentID: item.id, 
         selectorItems: JSON.parse(item.modifier_items), 
         selectorFieldname: 'value', 
         showSelector: true,
         onItemPress: this.onModifierSelect
      })
   }
  
   onModifierSelect = (subitem, parentID = null) => {
      let modifiersList = _.map(this.state.modifiersList, item => {
      if(item.id === parentID)
         item.selectedValue = subitem.value
         return item
      })
      
      this.setState({ modifiersList, showSelector: false })
   }
  
   showDatePicker = () => {
      this.setState({ showDatePicker: true })
   }
  
   onDateChange = (newDate) => {
      this.setState({ date: newDate })
   }

   onCloseDatePicker = () => {
      this.setState({ showDatePicker: false })
   }
   
   goTo = (routeName, param = null) => {
      this.props.dispatch(NavigationActions.navigate({ routeName, params: {
         id: param,
         callback: this.refreshOrder
      } }))
   }

   updateField = (field, value) => {
      this.setState({ [field]: value })
   }

   onSubmit = () => {
      //get all orders including items
      //delete the current order on realm
      //alert success
      let orders = Realm.objects('Order')
      let order = _.head(orders)

      let orderItems = Realm.objects('OrderItem')

      let payload = {
         order,
         orderItems
      }

      this.props.dispatch({
         type: 'sales/saveOrder',
         payload,
         callback: this.onSubmitSuccess
      })
   }

   onSubmitSuccess = responseData => {
      if(responseData.response === 200){
			Realm.write(() => {
				let order = Realm.objects('Order')
				let orders = Realm.objects('OrderItem')

				Realm.delete(order)
				Realm.delete(orders)

				this.refreshOrder()

				this.props.navigation.state.params.callback()
				this.props.navigation.goBack()
			})
      }
   }

   deleteOrderItem = record => {
      Alert.alert(
         'Confirmation',
         'Are you sure you want to delete?',
         [
            {
               text: 'Cancel',
               onPress: () => console.log('Cancel Pressed'),
               style: 'cancel',
            },
            {text: 'Delete', onPress: () => this.onDeleteOrderItem(record)},
         ],
         {cancelable: false},
      )
   }

   onDeleteOrderItem = record => {
      Realm.write(() => {
         let itemObj = Realm.objects('OrderItem').filtered(`id = '${record.id}'`)
         Realm.delete(itemObj)

         this.refreshOrder()
      })
   }

   voidOrder = () => {
      Alert.alert(
         'Confirmation',
         'Are you sure you want to void this order?',
         [
            {
               text: 'Cancel',
               onPress: () => console.log('Cancel Pressed'),
               style: 'cancel',
            },
            {text: 'Void', onPress: this.onVoidOrder},
         ],
         {cancelable: false},
      )
   }

   onVoidOrder = () => {

      Realm.write(() => {
         let orders = Realm.objects('Order')
         let orderItems = Realm.objects('OrderItems')

         Realm.delete(orders)
         Realm.delete(orderItems)

         Alert.alert(
            'Confirmation',
            'Order successfully voided',
            [
               {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
               },
               {text: 'OK, Thanks', onPress: () => this.setState({ order: {}}, () => {
                  this.refreshOrder()
                  this.props.navigation.goBack()
               })},
            ],
            {cancelable: false},
         )
      })
   }

   render() {

      const { params } = this.props.navigation.state

      return (
         <JLayout unpad noScroll>
            <ScrollView>
               {
                  !_.isEmpty(this.state.order) ? (
                     <TouchableOpacity onPress={() => this.goTo('CreateOrderDetails', this.state.order.id)} style={{ margin: 3, backgroundColor: '#1d6bc4', padding: 10, borderRadius: 3 }}>
                        <View>
                           <View style={{ flex: 1, flexDirection: 'row' }}>
                              <View style={{ flex: 0.5 }}>
                                 <Text style={{ color: 'white' }}>{moment(this.state.order.pickup_datetime).format("MM/DD/YYYY")}</Text>
                              </View>
                              <View style={{ flex: 0.5, alignItems: 'flex-end' }}>
                                 <Text style={{ color: 'white' }}>{this.state.order.pickup_location}</Text>
                              </View>
                           </View>
                           <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>{this.state.order.customer_name}</Text>
                           <Text style={{ color: 'white', fontSize: 15 }}>{this.state.order.customer_contact}</Text>
                        </View>
                     
                        <View style={{ marginTop: 3 }}>
                              <Text style={{ color: 'white' }}>{this.state.order.order_details}</Text>
                        </View>
                        
                        <View style={{ flex: 1, flexDirection: 'row', marginTop: 3 }}>
                           <View style={{ flex: 0.5 }}>
                              <Text style={{ color: 'white', fontWeight: 'bold' }}>{this.state.order.status}</Text>
                           </View>
                           <View style={{ flex: 0.5, alignItems: 'flex-end' }}>
                              <Text style={{ color: 'white', fontWeight: 'bold' }}>{this.state.order.initial_payment}</Text>
                           </View>
                        </View>
                     </TouchableOpacity>
                  ) : (
                     <TouchableOpacity onPress={() => this.goTo('CreateOrderDetails')}>
                        <View style={{ margin: 3, backgroundColor: '#1d6bc4', padding: 10, borderRadius: 3 }}>
                           <View style={{ flex: 0.5 }}>
                              <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Add Order Details</Text>
                           </View>
                        </View>
                     </TouchableOpacity>
                  )
               }

                <View>
                  {
                     _.map(this.state.orderItems, (record, idx) => {
                        
                        return <TouchableOpacity onLongPress={() => this.deleteOrderItem(record)} key={idx} style={{ flex: 0.9, backgroundColor: '#ff911c', padding: 10, borderRadius: 3, marginLeft: 3, marginRight: 3, marginBottom: 3  }}>
                              <View key={record.id}>
                                 <Text style={{ color: 'white', fontSize: 18 }}>{record.qty} {record.item}</Text>
                                 <Text style={{ color: 'white', fontSize: 15 }}>{record.item_details}</Text>
                              </View>
                           </TouchableOpacity>
                     })
                  }

                  <TouchableOpacity onPress={() => this.goTo('CreateOrderItems')}>
                     <View style={{ margin: 3, backgroundColor: '#d3740e', padding: 10, borderRadius: 3, marginTop: 0 }}>
                        <View style={{ flex: 0.5 }}>
                           <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Add Order Items</Text>
                        </View>
                     </View>
                  </TouchableOpacity>
               </View>
            </ScrollView>

            <View style={{ flex: 1, flexDirection: 'row', position: 'absolute', bottom: 3 }}>
               <View style={{ flex: 0.7, marginLeft: 3 }}>
                  <TouchableOpacity onPress={this.onSubmit}>
                     <View style={{ backgroundColor: '#d3740e', padding: 10, borderRadius: 3, marginTop: 0 }}>
                        <View style={{ flex: 0.5 }}>
                           <Text style={{ color: 'white', fontSize: 18 }}>Submit Orders</Text>
                        </View>
                     </View>
                  </TouchableOpacity>
               </View>
               <View style={{ flex: 0.3, marginRight: 3, marginLeft: 3 }}>
                  <TouchableOpacity onPress={this.voidOrder}>
                     <View style={{ backgroundColor: '#d3740e', padding: 10, borderRadius: 3, marginTop: 0 }}>
                        <View style={{ flex: 0.5 }}>
                           <Text style={{ color: 'white', fontSize: 18 }}>Void</Text>
                        </View>
                     </View>
                  </TouchableOpacity>
               </View>
            </View>
         </JLayout>
      )
   }
}
    
export default CreateOrder
