import React, { Component } from 'react'
import { View, ScrollView } from 'react-native'
import { Overlay } from 'react-native-elements'

class JLayout extends Component {
  state = {
    visibility: false
  }

  render() {

    let centrify = this.props.centered ? { justifyContent: 'center', alignItems: 'center' } : null
    let visible = this.props.visible && this.props.modal ? true : false
    let pad = this.props.unpad ? 0 : 20

    if(this.props.modal) {
      return <Overlay isVisible={visible} height='auto'>
        <View style={[centrify, this.props.style]}>{this.props.children}</View>
      </Overlay>
    } else if (this.props.noScroll) {
      return <View style={[{ backgroundColor: '#fff', flex: 1, padding: pad }, centrify, this.props.style ]}>
        {this.props.children}
      </View>
    }
    else {

      return <ScrollView style={[{ backgroundColor: '#fff', flex: 1, padding: pad }, centrify, this.props.style ]}>
        {this.props.children}
      </ScrollView>
    }
  }
}

export default JLayout
