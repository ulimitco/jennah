import React, { Component } from 'react'
import { Text, View, TouchableOpacity, ScrollView } from 'react-native'
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
      order: {}
   }
  
   componentDidMount () {
      this.refreshOrder()
   }

   refreshOrder = () => {
      let orders = Realm.objects('Order')
      let order = _.head(orders)

      if(!_.isEmpty(order)){
         this.setState({ order })
      }
   }

   holdOrder = () => {
      
      let categories = Realm.objects('Category')
      let head = _.head(categories)
      //let cid = Realm.objectForPrimaryKey('Category', head.id);

      let cat = head.items

      Realm.write(() => {
         cat.push({ id: uuidv1(), item: 'Item' + uuidv1() });
      })
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
         callback: this.onSubmitSuccess
      })
   }

   onSubmitSuccess = responseData => {
      
   }


   render() {

      const { params } = this.props.navigation.state
      
      return (
         <JLayout unpad noScroll>
            <ScrollView>
               {
                  !_.isEmpty(this.state.order) ? (
                     <TouchableOpacity onPress={() => this.goTo('CreateOrderDetails', this.state.order.id)} style={{ margin: 5, backgroundColor: '#1d6bc4', padding: 10, borderRadius: 3 }}>
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
                     
                        <View style={{ marginTop: 5 }}>
                              <Text style={{ color: 'white' }}>{this.state.order.order_details}</Text>
                        </View>
                        
                        <View style={{ flex: 1, flexDirection: 'row', marginTop: 5 }}>
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
                        <View style={{ margin: 5, backgroundColor: '#1d6bc4', padding: 10, borderRadius: 3 }}>
                           <View style={{ flex: 0.5 }}>
                              <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Add Order Details</Text>
                           </View>
                        </View>
                     </TouchableOpacity>
                  )
               }

                <View>
                  {
                     _.map(this.state.order.order_items, record => {
                        return <View key={record.id} style={{ marginBottom: 5, marginLeft: 5, marginRight: 5, backgroundColor: '#ff911c', padding: 10, borderRadius: 3 }}>
                           <Text style={{ color: 'white', fontSize: 18 }}>{record.qty} {record.item}</Text>
                           <Text style={{ color: 'white', fontSize: 15 }}>{
                              _.map(JSON.parse(record.item_details), item => {
                                 return item.item + ' ' + item.value + ', '
                              })
                           }</Text>
                        </View>
                     })
                  }

                  <TouchableOpacity onPress={() => this.goTo('CreateOrderItems')}>
                     <View style={{ margin: 5, backgroundColor: '#d3740e', padding: 10, borderRadius: 3, marginTop: 0 }}>
                        <View style={{ flex: 0.5 }}>
                           <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Add Order Items</Text>
                        </View>
                     </View>
                  </TouchableOpacity>
               </View> 
            </ScrollView>

            <View style={{ position: 'absolute', bottom: 5 }}>
               <TouchableOpacity style={{ width: '100%', marginLeft: 5, marginRight: 5 }}>
                  <View style={{ backgroundColor: '#d3740e', padding: 10, borderRadius: 3, marginTop: 0 }}>
                     <View style={{ flex: 0.5 }}>
                        <Text style={{ color: 'white', fontSize: 18 }}>Close Order</Text>
                     </View>
                  </View>
               </TouchableOpacity>
            </View>
         </JLayout>
      )
   }
}
    
export default CreateOrder
    