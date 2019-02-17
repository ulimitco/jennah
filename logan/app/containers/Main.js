import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'
import { Icon } from 'react-native-elements'

import { JText, JLayout } from '../components'

import { NavigationActions } from '../utils'

@connect(({ app }) => ({ ...app }))
class Main extends Component {
  gotoDetail = () => {
    this.props.dispatch(NavigationActions.navigate({ routeName: 'Detail' }))
  }

  render() {
    return (
      <JLayout>
        <View style={{ backgroundColor: 'rgba(229, 0, 76, 0.7)', padding: 20, borderWidth: 1, borderColor: '#fff', borderRadius: 5, marginTop: 10, flexDirection: 'row' }}>
          <Text style={{ fontFamily: 'OpenSans-Semibold', fontSize: 30, color: 'white' }}>New Order</Text>
        </View>

        <View style={{ padding: 20, borderWidth: 1, borderColor: '#e8e8e8', borderRadius: 5, marginTop: 10 }}>
          <Text style={{ fontFamily: 'OpenSans-Semibold', fontSize: 30 }}>Pending Orders</Text>
        </View>

      </JLayout>
    )
  }
}

export default Main
