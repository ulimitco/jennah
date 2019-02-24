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

    let productList = [
      { id: 13, item: 'Chocolate Cake' },
      { id: 14, item: 'Vanilla Cake' },
      { id: 15, item: 'Red Velvet' },
      { id: 16, item: 'Hershey Cake' },
    ]

    let branchesList = [
      { id: 17, branch: 'Burgos' },
      { id: 18, branch: 'Cogon' },
      { id: 19, branch: 'J.A. Clarin' },
      { id: 20, branch: 'C.P.G.' },
    ]

    let sidesList = [
      { id: 1, modifier: 'Size', modifierItems: [
        { id: 2, modifier_item_name: '6"' },
        { id: 3, modifier_item_name: '7"' },
        { id: 4, modifier_item_name: '9"' }
      ]},
      { id: 5, modifier: 'Recipe', modifierItems: [
        { id: 6, modifier_item_name: '.5' },
        { id: 7, modifier_item_name: '.75' },
        { id: 8, modifier_item_name: '1' }
      ]},
      { id: 9, modifier: 'Add-On', modifierItems: [
        { id: 10, modifier_item_name: 'Edible Decor' },
        { id: 11, modifier_item_name: 'Acrylic Topper' },
        { id: 12, modifier_item_name: 'Paper Topper' }
      ]}
    ]

    let modifiersList = _.map(sidesList, item => {
      item.selectedValue = ''
      return item
    })

    let itemsList = _.map(productList, item => {
      item.selected = false
      return item
    })

    let branchList = _.map(branchesList, item => {
      return item
    })

    this.setState({ modifiersList, itemsList, branchList })

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
      selectorItems: item.modifierItems, 
      selectorFieldname: 'modifier_item_name', 
      showSelector: true,
      onItemPress: this.onModifierSelect
    })
  }

  onModifierSelect = (subitem, parentID = null) => {
    let modifiersList = _.map(this.state.modifiersList, item => {
      if(item.id === parentID)
        item.selectedValue = subitem.modifier_item_name
        
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
              leftElement={<Text style={{ fontSize: 18, color: '#565656', fontWeight: 'bold' }}>{item.modifier}</Text>}
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

        <ListItem
          leftElement={<Text style={{ fontSize: 20, color: '#526884', fontWeight: 'bold' }}>Pickup Details</Text>}
          containerStyle={{ backgroundColor: '#f5f8fa' }}
        />

        {/* ------ datetime group group */}
        <ListItem
          key={'pickup_date'}
          leftElement={<Text style={{ fontSize: 18, color: '#565656', fontWeight: 'bold' }}>Pickup Date/Time</Text>}
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
