import React, { Component } from 'react'
import { View, ScrollView, KeyboardAvoidingView } from 'react-native'
import { Overlay } from 'react-native-elements'
import { Header } from 'react-navigation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

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
        <KeyboardAvoidingView keyboardVerticalOffset={Header.HEIGHT} behavior="padding" enabled style={[centrify, this.props.style]}>{this.props.children}</KeyboardAvoidingView>
      </Overlay>
    } else if (this.props.noScroll) {
      return <KeyboardAvoidingView keyboardVerticalOffset={Header.HEIGHT} behavior="padding" enabled style={[{ backgroundColor: '#e6ecf0', flex: 1, padding: pad }, centrify, this.props.style ]}>
        {this.props.children}
      </KeyboardAvoidingView>
    }
    else {
      return <KeyboardAwareScrollView keyboardVerticalOffset={Header.HEIGHT} behavior="padding" enabled style={[{ backgroundColor: '#e6ecf0', flex: 1, padding: pad }, centrify, this.props.style ]}>
        {this.props.children}
      </KeyboardAwareScrollView>
    }
  }
}

export default JLayout
