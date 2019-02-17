import React, { Component } from 'react'
import { View } from 'react-native'

class JLayout extends Component {
  render() {

    let centrify = this.props.centered ? { justifyContent: 'center', alignItems: 'center' } : null
    
    return (
      <View style={[{ backgroundColor: '#fff', flex: 1 }, centrify ]}>
        {this.props.children}
      </View>
    )
  }
}

export default JLayout
