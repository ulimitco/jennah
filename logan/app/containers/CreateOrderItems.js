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
class CreateOrderItems extends Component {
   state = {
      
      mode: 'add',
      itemsList: [],
      modifiersList: [],
      branchList: [],
      
      selectedItem: '',
      selectedBranch: '',
      showSelector: false,
      selectedItemObj: {},

      selectorItems: [],
      selectorFieldname: '',
      selectorParentID: '',
      modifiers: [],

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

      this.setState({ itemsList, selectedItem: item.item, showSelector: false, selectedItemObj: item })
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
         if(item.id === parentID){

            let modifiers = this.state.modifiers


            modifiers.push({ modifier: {
               modifier_id: item.id,
               modifier_title: item.modifier_title
            }, value: subitem })

            this.setState({ modifiers })

            item.selectedValue = subitem.value
         }
         
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
         Realm.create('OrderItem', {
            id: uuidv1(),
            qty: parseInt(this.state.qty),
            item: JSON.stringify(this.state.selectedItemObj),
            item_details: JSON.stringify(this.state.modifiers)
         })
      })

      this.props.navigation.state.params.callback()
      this.props.navigation.goBack()
   }
   render() {

      const { params } = this.props.navigation.state

      return (
         <JLayout unpad style={{ paddingBottom: 100 }}>

         <ListItem
            leftElement={<Text style={{ fontSize: 20, color: '#526884', fontWeight: 'bold' }}>Order Information</Text>}
            containerStyle={{ backgroundColor: '#f5f8fa' }}
         />

         <Input
            key={'qty'}
            placeholder='Enter quantity'
            inputStyle={{ borderBottomWidth: 0 }}
            inputContainerStyle={{ borderBottomWidth: 0, paddingLeft: 5, paddingBottom: 5 }}
            containerStyle={{ backgroundColor: '#fff' }}
            keyboardType={'numeric'}
            value={this.state.qty}
            onChangeText={text => this.updateField('qty', text)}
         />

         <ListItem
            key={'item'}
            leftElement={<Text style={{ fontSize: 18, color: '#565656', fontWeight: 'bold' }}>Select Item</Text>}
            rightElement={<Text style={{ fontSize: 18 }}>{this.state.selectedItem || ''}</Text>}
            onPress={() => this.itemSelect()}
            bottomDivider
            chevron
         />

         {
            _.map(this.state.modifiersList, item => {
               return <ListItem
               key={item.id}
               leftElement={<Text style={{ fontSize: 18, color: '#565656', fontWeight: 'bold' }}>{item.modifier_title}</Text>}
               rightElement={<Text style={{ fontSize: 18 }}>{item.selectedValue}</Text>}
               onPress={() => this.modifierSelect(item)}
               bottomDivider
               chevron
               />
            })
         }

         <JButton title={"Add Item"} onPress={() => this.onSubmit()} />

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

   export default CreateOrderItems
