import React, { Component } from 'react'
import { Text, View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { Input, Icon, ListItem, Badge, Button, Divider } from 'react-native-elements'

import { JText, JLayout, JButton, JSelector, JInput, JDateTimePicker } from '../components'

import { NavigationActions } from '../utils'
import _ from 'lodash'
import moment from 'moment'


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
      
      date: new Date()
   }
  
   componentDidMount () {
      
      this.getModifiersList()
      this.getItemsList()
      
      let branchesList = [
         { id: 17, branch: 'Burgos' },
         { id: 18, branch: 'Cogon' },
         { id: 19, branch: 'J.A. Clarin' },
         { id: 20, branch: 'C.P.G.' },
      ]
      
      let branchList = _.map(branchesList, item => {
         return item
      })
      
      this.setState({ branchList })
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
  
  // saveOrder = () => {
  //   this.props.dispatch({
  //     type: 'sales/saveOrder',
  //     callback: (productList) => {
  //       let itemsList = _.map(productList, item => {
  //         item.selected = false
  //         return item
  //       })
  
  //       this.setState({ itemsList })
  //     }
  //   })
  // }
  
   updateField = (field, value) => {
      this.setState({ [field]: value })
   }

   onSubmit = () => {
      
      let payload = {}
      
      payload.order_details = this.state.order_details
      payload.initial_payment = this.state.initial_payment
      payload.pickup_datetime = moment(this.state.date).format('MM/DD/YYYY hh:mm:ss')
      payload.sale_datetime = moment().format("MM/DD/YYYY hh:mm:ss")
      payload.pickup_location = this.state.selectedBranch
      payload.customer_name = this.state.customer_name
      payload.customer_contact = this.state.customer_contact
      
      this.props.dispatch({
         type: 'sales/saveOrder',
         payload,
         callback: () => console.log('Called')
      })
   }
  
   render() {
      let data = {
         orderDetails: {
            pickup_datetime: 'April 9, 2019 6:30PM',
            pickup_location: 'Jojie\'s Burgos',
            customer_name: 'Ace Jordan',
            customer_contact: '(+63)925 505 5519',
            order_details: 'The quick little brown fox jumps over the back of the lazy dog.',
            payment_status: 'PAID',
            payment_amount: 'P 2,000.00'
         },
         items: [
            { id: 1, qty: 1, item: 'Fruit Cake', item_details: 'Red Color, Mint Flavor, and Etc' },
            { id: 2, qty: 3, item: 'Red Velvet Cake', item_details: 'Red Color, Mint Flavor, and Etc' },
            { id: 3, qty: 2, item: 'Chocolate Cake', item_details: 'Red Color, Mint Flavor, and Etc' },
         ]
      }

      const { params } = this.props.navigation.state
    
      return (
         <JLayout unpad>
            <View style={{ marginTop: 5, marginLeft: 5, marginRight: 5, backgroundColor: '#1d6bc4', padding: 10 }}>
               {
                  !_.isEmpty(data.orderDetails) ? (
                     <View>
                        <View>
                           <View style={{ flex: 1, flexDirection: 'row' }}>
                              <View style={{ flex: 0.5 }}>
                                 <Text style={{ color: 'white' }}>{data.orderDetails.pickup_datetime}</Text>
                              </View>
                              <View style={{ flex: 0.5, alignItems: 'flex-end' }}>
                                 <Text style={{ color: 'white' }}>{data.orderDetails.pickup_location}</Text>
                              </View>
                           </View>
                           <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>{data.orderDetails.customer_name}</Text>
                           <Text style={{ color: 'white', fontSize: 15 }}>{data.orderDetails.customer_contact}</Text>
                        </View>
                     
                        <View style={{ marginTop: 5 }}>
                              <Text style={{ color: 'white' }}>{data.orderDetails.order_details}</Text>
                        </View>
                        
                        <View style={{ flex: 1, flexDirection: 'row', marginTop: 5 }}>
                           <View style={{ flex: 0.5 }}>
                              <Text style={{ color: 'white', fontWeight: 'bold' }}>{data.orderDetails.payment_status}</Text>
                           </View>
                           <View style={{ flex: 0.5, alignItems: 'flex-end' }}>
                              <Text style={{ color: 'white', fontWeight: 'bold' }}>{data.orderDetails.payment_amount}</Text>
                           </View>
                        </View>
                     </View>
                  ) : null
               }
            </View>

            <TouchableOpacity>
               <View style={{ margin: 5, backgroundColor: '#124784', padding: 5, marginTop: 0 }}>
                  <View style={{ flex: 1, alignItems: 'center' }}>
                     <Text style={{ color: 'white', fontSize: 13 }}>Edit Details</Text>
                  </View>
               </View>
            </TouchableOpacity>

            <View>
               {
                  _.map(data.items, record => {
                     return <View key={record.id} style={{ margin: 5, backgroundColor: '#ff911c', padding: 10, borderRadius: 3, marginTop: 0 }}>
                        <Text style={{ color: 'white', fontSize: 18 }}>{record.qty} {record.item}</Text>
                        <Text style={{ color: 'white', fontSize: 15 }}>{record.item_details}</Text>
                     </View>
                  })
               }

               <TouchableOpacity>
                  <View style={{ margin: 5, backgroundColor: '#d3740e', padding: 10, borderRadius: 3, marginTop: 0 }}>
                     <View style={{ flex: 0.5 }}>
                        <Text style={{ color: 'white', fontSize: 18 }}>Add Order</Text>
                     </View>
                  </View>
               </TouchableOpacity>

            </View>
         </JLayout>
      )
   }
}
    
export default CreateOrder
    