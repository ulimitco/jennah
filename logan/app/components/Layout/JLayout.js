import React, { Component } from 'react'
import { View } from 'react-native'
import { Overlay } from 'react-native-elements'

class JLayout extends Component {
  render() {

    let centrify = this.props.centered ? { justifyContent: 'center', alignItems: 'center' } : null
    let visible = this.props.visible && this.props.modal ? true : false

    if(this.props.modal) {
      return <Overlay isVisible={visible}>
        <View style={[{ flex: 1 }, centrify]}>{this.props.children}</View>
      </Overlay>
    } else {

      return <View style={[{ backgroundColor: '#fff', flex: 1 }, centrify ]}>
        {this.props.children}
      </View>
    }
  }
}

export default JLayout
