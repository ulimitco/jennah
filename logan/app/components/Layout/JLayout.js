import React, { Component } from 'react'
import { View, ScrollView, KeyboardAvoidingView } from 'react-native'
import { Overlay } from 'react-native-elements'
import { Header } from 'react-navigation'

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
        <KeyboardAvoidingView keyboardVerticalOffset={-500} behavior="padding" enabled style={[centrify, this.props.style]}>{this.props.children}</KeyboardAvoidingView>
      </Overlay>
    } else if (this.props.noScroll) {
      return <KeyboardAvoidingView keyboardVerticalOffset={-500} behavior="padding" enabled style={[{ backgroundColor: '#fff', flex: 1, padding: pad }, centrify, this.props.style ]}>
        {this.props.children}
      </KeyboardAvoidingView>
    }
    else {
      return <KeyboardAvoidingView keyboardVerticalOffset={Header.HEIGHT + 64} behavior="padding" enabled style={[{ backgroundColor: '#fff', flex: 1, padding: pad }, centrify, this.props.style ]}>
          <ScrollView>
            {this.props.children}
          </ScrollView> 
      </KeyboardAvoidingView>
    }
  }
}

export default JLayout
