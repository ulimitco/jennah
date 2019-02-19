import React, { Component } from 'react'
import { Text, View, ScrollView, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { Icon, ListItem, Badge, Button } from 'react-native-elements'

import { JText, JLayout, JButton } from '../components'

import { NavigationActions } from '../utils'
import _ from 'lodash'

@connect(({ app }) => ({ ...app }))
class OrderView extends Component {
  state = {
    search: ''
  }

  render() {
    return (
      <JLayout noScroll>
        
      </JLayout>
    )
  }
}

export default OrderView
