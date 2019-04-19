import React, { Component } from 'react'
import { Text, View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { Input, Icon, ListItem, Badge, Button, Divider } from 'react-native-elements'

import { JText, JLayout, JButton, JSelector, JInput, JDateTimePicker } from '../components'

import { NavigationActions } from '../utils'
import _ from 'lodash'
import moment from 'moment'
import uuidv1 from 'uuid/v1'
import Realm from '../datastore'

@connect(({ app }) => ({ ...app }))
class CreateOrderDetails extends Component {
   state = {
      mode: 'add',
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

      this.retrieveOrder(this.props.navigation.state.params.id)

   }

   retrieveOrder = (id) => {

      let orders = Realm.objects('Order').filtered(`id = '${id}'`)
      let order = _.head(orders)

      if(!_.isEmpty(order))
         this.setState({ 
            id: order.id,
            order_details: order.order_details,
            initial_payment: order.initial_payment.toString(),
            date: new Date(order.pickup_datetime),
            selectedBranch: order.pickup_location,
            customer_name: order.customer_name,
            customer_contact: order.customer_contact,
            mode: 'edit'
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

   updateField = (field, value) => {
      this.setState({ [field]: value })
   }

   onSubmit = () => {

      Realm.write(() => {
         if(this.state.mode === 'add')
            Realm.create('Order', {
               id: uuidv1(),
               order_details: this.state.order_details,
               initial_payment: parseFloat(this.state.initial_payment),
               sale_datetime: moment().format("MM/DD/YYYY hh:mm:ss"),
               pickup_datetime: moment(this.state.date).format('MM/DD/YYYY hh:mm:ss'),
               pickup_location: this.state.selectedBranch,
               customer_name: this.state.customer_name,
               customer_contact: this.state.customer_contact,
               status: 'PENDING',
               order_items: []
            })
         else
            Realm.create('Order', {
               id: this.state.id,
               order_details: this.state.order_details,
               initial_payment: parseFloat(this.state.initial_payment),
               sale_datetime: moment().format("MM/DD/YYYY hh:mm:ss"),
               pickup_datetime: moment(this.state.date).format('MM/DD/YYYY hh:mm:ss'),
               pickup_location: this.state.selectedBranch,
               customer_name: this.state.customer_name,
               customer_contact: this.state.customer_contact,
               status: 'PENDING',
               order_items: []
            }, true)
      })

      this.props.navigation.state.params.callback()
      this.props.navigation.goBack()
   }

   render() {

      const { params } = this.props.navigation.state

      return (
         <JLayout unpad>
         <ListItem
            leftElement={<Text style={{ fontSize: 20, color: '#526884', fontWeight: 'bold' }}>Order Information</Text>}
            containerStyle={{ backgroundColor: '#f5f8fa' }}
         />

         <Input
            key={'details_input'}
            placeholder='Type order details here'
            multiline
            inputStyle={{ borderBottomWidth: 0 }}
            inputContainerStyle={{ borderBottomWidth: 0, marginLeft: 5, paddingBottom: 5 }}
            containerStyle={{ backgroundColor: '#fff' }}
            value={this.state.order_details}
            onChangeText={text => this.updateField('order_details', text)}
         />
         <Divider />

         {/* ------ customer group */}
         <ListItem
            leftElement={<Text style={{ fontSize: 20, color: '#526884', fontWeight: 'bold' }}>Customer Details</Text>}
            containerStyle={{ backgroundColor: '#f5f8fa' }}
         />

         <ListItem
            key={'customer_name'}
            leftElement={<Text style={{ fontSize: 18, color: '#565656', fontWeight: 'bold' }}>Customer Name</Text>}
         />
         <Input
            key={'customer_name_input'}
            placeholder='Enter customer name'
            inputStyle={{ borderBottomWidth: 0 }}
            inputContainerStyle={{ borderBottomWidth: 0, paddingLeft: 5, paddingBottom: 5 }}
            containerStyle={{ backgroundColor: '#fff' }}
            value={this.state.customer_name}
            onChangeText={text => this.updateField('customer_name', text)}
         />

         <Divider />

         <ListItem
            key={'contact'}
            leftElement={<Text style={{ fontSize: 18, color: '#565656', fontWeight: 'bold' }}>Contact No</Text>}
         />
         <Input
            key={'contact_input'}
            placeholder='Enter contact number'
            inputStyle={{ borderBottomWidth: 0, backgroundColor: '#fff' }}
            inputContainerStyle={{ borderBottomWidth: 0, paddingLeft: 5, paddingBottom: 5 }}
            containerStyle={{ backgroundColor: '#fff' }}
            value={this.state.customer_contact}
            onChangeText={text => this.updateField('customer_contact', text)}
         />
         
         <Divider />

         <ListItem
            leftElement={<Text style={{ fontSize: 20, color: '#526884', fontWeight: 'bold' }}>Pickup Details</Text>}
            containerStyle={{ backgroundColor: '#f5f8fa' }}
         />


         <ListItem
            key={'pickup_date'}
            leftElement={<Text style={{ fontSize: 18, color: '#565656', fontWeight: 'bold' }}>Date/Time</Text>}
            rightElement={<Text style={{ fontSize: 18 }}>{moment(this.state.date).format('MMM DD, YYYY hh:mm A') || ''}</Text>}
            onPress={() => this.showDatePicker()}
            bottomDivider
         />

         <ListItem
            key={'branch'}
            leftElement={<Text style={{ fontSize: 18, color: '#565656', fontWeight: 'bold' }}>Pickup Branch</Text>}
            rightElement={<Text style={{ fontSize: 18 }}>{this.state.selectedBranch || ''}</Text>}
            onPress={() => this.branchSelect()}
            bottomDivider
            chevron
         />

         <ListItem
            leftElement={<Text style={{ fontSize: 20, color: '#526884', fontWeight: 'bold' }}>Payment Details</Text>}
            containerStyle={{ backgroundColor: '#f5f8fa' }}
         />

         <ListItem
            key={'initial_payment'}
            leftElement={<Text style={{ fontSize: 18, color: '#565656', fontWeight: 'bold' }}>Initial Payment</Text>}
         />

         <Input
            key={'initial_payment_input'}
            placeholder='Enter initial payment'
            inputStyle={{ borderBottomWidth: 0 }}
            inputContainerStyle={{ borderBottomWidth: 0, paddingLeft: 5, paddingBottom: 5 }}
            containerStyle={{ backgroundColor: '#fff' }}
            keyboardType={'numeric'}
            value={this.state.initial_payment}
            onChangeText={text => this.updateField('initial_payment', text)}
         />

         <JButton title={"Save Order"} onPress={() => this.onSubmit()} />

         <JSelector 
            parentID={this.state.selectorParentID}
            visible={this.state.showSelector} 
            data={this.state.selectorItems} 
            fieldname={this.state.selectorFieldname} 
            onItemPress={this.state.onItemPress}
         />

         <JDateTimePicker
            visible={this.state.showDatePicker}
            onDateChange={this.onDateChange}
            date={this.state.date}
            onClose={this.onCloseDatePicker}
         />

         </JLayout>
      )
   }
   }

   export default CreateOrderDetails
