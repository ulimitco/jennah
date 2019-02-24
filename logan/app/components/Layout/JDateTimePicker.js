import React, { Component } from 'react'
import { View, Text, DatePickerIOS, DatePickerAndroid } from 'react-native'
import { Icon, ListItem } from 'react-native-elements'
import { JInput, JLayout, JButton } from '..';
import _ from 'lodash'

export default class JDateTimePicker extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <JLayout unpad modal visible={this.props.visible}> 
        <DatePickerIOS
          date={this.props.date}
          onDateChange={this.props.onDateChange}
          {...this.props}
        />
        <JButton title={"Yes, That's it"} onPress={() => this.props.onClose()} />
      </JLayout>
    )
  }
}