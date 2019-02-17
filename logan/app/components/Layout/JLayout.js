import React, { Component } from 'react'
import { View, ScrollView } from 'react-native'
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

      return <ScrollView style={[{ backgroundColor: '#fff', flex: 1, padding: 20 }, centrify ]}>
        {this.props.children}
      </ScrollView>
    }
  }
}

export default JLayout
