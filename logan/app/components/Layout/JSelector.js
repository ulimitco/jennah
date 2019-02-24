import React, { Component } from 'react'
import { View, Text, StatusBar } from 'react-native'
import { Icon, ListItem } from 'react-native-elements'
import { JInput, JLayout } from '..';
import _ from 'lodash'

export default class JSelector extends Component {
    constructor(props){
      super(props)
    }

    render() {
      return (
        <JLayout unpad modal visible={this.props.visible}> 
          {
            _.map(this.props.data, (item, i) => (
              <ListItem
                key={i}
                title={item[this.props.fieldname]}
                onPress={() => this.props.onItemPress(item, this.props.parentID || null)}
                bottomDivider
                pad={0}
              />
            ))
          }
        </JLayout>
      )
    }
}