import React, { Component } from 'react'
import { View, Text, StatusBar, Device } from 'react-native'

export default class JHeader extends Component {
    constructor(props){
      super(props)
    }

    render() {
      return (
        <View 				
          style={{
            backgroundColor: 'white',
            alignItems: 'flex-start',
            height: 90,
            padding: 20,
            paddingTop: 30
				  }}>
          <StatusBar backgroundColor="blue" barStyle="dark-content" />
          <View>
            <Text style={{ color: 'gray' }}>FEBRUARY 17, 2019</Text>
          </View>
          <View>
            <Text style={{ fontFamily: 'OpenSans-Bold', fontSize: 30 }}>Today</Text>
          </View>
        </View>
      )
    }
}