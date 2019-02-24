import React, { Component } from 'react'
import { Text, View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { Input, Icon, ListItem, Badge, Button, Divider } from 'react-native-elements'

import { JText, JLayout, JButton, JSelector, JInput } from '../components'

import { NavigationActions } from '../utils'
import _ from 'lodash'


@connect(({ app }) => ({ ...app }))
class CreateOrder extends Component {
  state = {
    
    itemsList: [],
    modifiersList: [],
    
    selectedItem: '',
    showSelector: false,

    selectorItems: [],
    selectorFieldname: '',
    selectorParentID: '',

    onItemPress: ''
  }

  componentDidMount () {

    let productList = [
      { id: 13, item: 'Chocolate Cake' },
      { id: 14, item: 'Vanilla Cake' },
      { id: 15, item: 'Red Velvet' },
      { id: 16, item: 'Hershey Cake' },
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

    this.setState({ modifiersList, itemsList })

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

  render() {

    const { params } = this.props.navigation.state

    return (
      <JLayout noScroll unpad>
        <ListItem
          key={'item'}
          leftElement={<Text style={{ fontSize: 18 }}>Item</Text>}
          rightElement={<Text style={{ fontSize: 18 }}>{this.state.selectedItem || ''}</Text>}
          onPress={() => this.itemSelect()}
          bottomDivider
          chevron
        />

        {
          _.map(this.state.modifiersList, item => {
            return <ListItem
              key={item.id}
              leftElement={<Text style={{ fontSize: 18 }}>{item.modifier}</Text>}
              rightElement={<Text style={{ fontSize: 18 }}>{item.selectedValue}</Text>}
              onPress={() => this.modifierSelect(item)}
              bottomDivider
              chevron
            />
          })
        }

        <ListItem
          key={'details'}
          leftElement={<Text style={{ fontSize: 18 }}>Order Details</Text>}
        />

        <Input
          key={'details_input'}
          placeholder='Type order details here'
          multiline
          inputStyle={{ borderBottomWidth: 0 }}
          inputContainerStyle={{ borderBottomWidth: 0, marginLeft: 5, paddingBottom: 5 }}
        />

        <Divider />

        <JSelector 
          parentID={this.state.selectorParentID}
          visible={this.state.showSelector} 
          data={this.state.selectorItems} 
          fieldname={this.state.selectorFieldname} 
          onItemPress={this.state.onItemPress}  
        />

      </JLayout>
    )
  }
}

export default CreateOrder
