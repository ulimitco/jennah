import React, { Component } from 'react'
import { View, Text, StatusBar } from 'react-native'
import { Icon } from 'react-native-elements'

export default class JHeader extends Component {
    constructor(props){
      super(props)
    }

    goBack = () => {
      this.props.navigation.goBack()
    }
    render() {
      return (
        <View 				
          style={{
            backgroundColor: 'white',
            alignItems: 'flex-start',
            paddingLeft: 20,
            paddingRight: 20,
            paddingTop: 50
				  }}>
          <StatusBar backgroundColor="blue" barStyle="dark-content" />
          <View style={{ flexDirection: 'row' }}>
            <View style={{ paddingRight: 15 }}>
              {
                this.props.back ? <Icon
                  name='arrow-left'
                  type='feather'
                  color='#000'
                  size={30}
                  onPress={this.goBack} /> : null
              }
            </View>
            <View>
              <View>
                <Text style={{ color: 'gray' }}>FEBRUARY 17, 2019</Text>
              </View>
              <View>
                <Text style={{ fontFamily: 'OpenSans-Bold', fontSize: 30 }}>{this.props.title}</Text>
              </View>
            </View>
          </View>

        </View>
      )
    }
}