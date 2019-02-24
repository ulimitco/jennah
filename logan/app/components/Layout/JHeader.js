import React, { Component } from 'react'
import { View, Text, StatusBar, StyleSheet } from 'react-native'
import { Icon } from 'react-native-elements'

export default class JHeader extends Component {
    constructor(props){
      super(props)
    }

    goBack = () => {
      this.props.navigation.goBack()
    }
    render() {

      let color = this.props.whiteout ? 'white' : '#2d2d2d'
      let bColor = this.props.whiteout ? 'rgba(229, 0, 76, 0.7)' : 'white'
      let statusBar = this.props.whiteout ? 'light-content' : 'dark-content'

      return (
        <View style={{ paddingTop: 35, backgroundColor: '#fff', borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: 'rgba(0,0,0,0.3)' }}>
          <StatusBar barStyle={'dark-content'} />

          <View style={{ flexDirection: 'row', paddingBottom: 10 }}>
            <View style={{ flex: 0.1, justifyContent: 'flex-start' }}>
              {
                this.props.back ? <Icon
                  name='arrow-left'
                  type='feather'
                  size={23}
                  iconStyle={{ paddingTop: 2 }}
                  onPress={this.goBack} /> : null
              }
            </View>
            <View style={{ flex: 0.8, justifyContent: 'center' }}>
                <Text style={{ fontFamily: 'OpenSans-Bold', fontSize: 22, alignSelf: 'center' }}>{this.props.title}</Text>
            </View>
            <View style={{ flex: 0.1, justifyContent: 'flex-end' }}>
              {
                this.props.back ? <Icon
                  name='arrow-right'
                  type='feather'
                  size={23}
                  iconStyle={{ paddingTop: 2 }}
                  onPress={this.goBack} /> : null
              }
            </View>
          </View>

        </View>
      )
    }
}