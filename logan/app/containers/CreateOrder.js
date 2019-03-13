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

  render() {

    const { params } = this.props.navigation.state

    return (
      <JLayout unpad>
        <ListItem
          leftElement={<Text style={{ fontSize: 20, color: '#526884', fontWeight: 'bold' }}>Order Information</Text>}
          containerStyle={{ backgroundColor: '#f5f8fa' }}
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

        {/* ------ details group */}
        <ListItem
          key={'details'}
          leftElement={<Text style={{ fontSize: 18, color: '#565656', fontWeight: 'bold' }}>Order Details</Text>}
        />
        <Input
          key={'details_input'}
          placeholder='Type order details here'
          multiline
          inputStyle={{ borderBottomWidth: 0 }}
          inputContainerStyle={{ borderBottomWidth: 0, marginLeft: 5, paddingBottom: 5 }}
          containerStyle={{ backgroundColor: '#fff' }}
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
        />
        <Divider />

        {/* ------ datetime group group */}

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

        {/* ------ customer group */}
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
        />

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

export default CreateOrder
