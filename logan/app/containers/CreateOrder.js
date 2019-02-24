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
    showSelectItem: false,
    search: '',
    itemSelect: false,
    itemValue: '',
    modifiersList: [],
    showSelector: false,
    selectorItems: [],
    selectorFieldname: '',
    selectorParentID: ''
  }

  componentDidMount () {
    let sidesList = [
      { id: 1, modifier: 'Flavor', modifierItems: [
        { id: 2, modifier_item_name: 'Chocolate' },
        { id: 3, modifier_item_name: 'Vanilla' },
        { id: 4, modifier_item_name: 'Banana' }
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

    this.setState({ modifiersList })

  }

  modifierSelect = (item) => {
    this.setState({ selectorParentID: item.id, selectorItems: item.modifierItems, selectorFieldname: 'modifier_item_name', showSelector: true })
  }

  onModifierSelect = (subitem, parentID = null) => {
    let modifiersList = _.map(this.state.modifiersList, item => {
      if(item.id === parentID)
        item.selectedValue = subitem.modifier_item_name
        
      return item
    })

    this.setState({ modifiersList, showSelector: false })
  }

  showItems = (val) => {
    this.setState({ showSelectItem: val })
  }

  render() {

    const { params } = this.props.navigation.state

    return (
      <JLayout noScroll unpad>
        <ListItem
          key={'item'}
          leftElement={<Text style={{ fontSize: 18 }}>Item</Text>}
          rightElement={<Text style={{ fontSize: 18 }}>Item</Text>}
          onPress={() => console.log('Test')}
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
          onItemPress={this.onModifierSelect}  
        />
      </JLayout>
    )
  }
}

export default CreateOrder
