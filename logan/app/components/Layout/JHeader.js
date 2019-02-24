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

      let color = this.props.whiteout ? 'white' : '#2d2d2d'
      let bColor = this.props.whiteout ? 'rgba(229, 0, 76, 0.7)' : 'white'
      let statusBar = this.props.whiteout ? 'light-content' : 'dark-content'

      return (
        <View 				
          style={{
            backgroundColor: bColor,
            alignItems: 'flex-start',
            paddingLeft: 20,
            paddingRight: 20,
            paddingTop: 50,
            paddingBottom: 15
				  }}>
          <StatusBar backgroundColor="blue" barStyle={statusBar} />
          <View style={{ flexDirection: 'row' }}>
            <View style={{ paddingRight: 15 }}>
              {
                this.props.back ? <Icon
                  name='arrow-left'
                  type='feather'
                  color={color}
                  size={30}
                  onPress={this.goBack} /> : null
              }
            </View>
            <View>
              <View>
                <Text style={{ color }}>FEBRUARY 17, 2019</Text>
              </View>
              <View>
                <Text style={{ fontFamily: 'OpenSans-Bold', fontSize: 30, color }}>{this.props.title}</Text>
              </View>
            </View>
          </View>

        </View>
      )
    }
}