import React, { Component } from 'react'
import { View, Text, StatusBar, StyleSheet, Alert } from 'react-native'
import { Icon } from 'react-native-elements'
import Realm from '../../datastore'
import { NavigationActions } from '../../utils'

export default class JHeader extends Component {
    constructor(props){
      super(props)
    }

    goBack = () => {
      this.props.navigation.goBack()
    }

    logout = () => {
      Alert.alert(
        'Logout',
        'Are you sure you want logout?',
        [
          {
            text: 'Logout', 
            onPress: () => {
              
              this.props.dispatch({
                type: 'app/logout',
                callback: () => {
                  this.props.navigation.navigate({ routeName: 'Auth' })
                }
              })
            }
          },
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          }
        ],
        {cancelable: false},
      )
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
                  onPress={this.logout} /> : null
              }
            </View>
          </View>

        </View>
      )
    }
}