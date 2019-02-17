import React, { Component } from 'react'
import { Button } from 'react-native-elements';

class JButton extends Component {
  render() {
    return (
      <Button
        title={this.props.title}
        containerStyle={{ width: '100%' }}
        buttonStyle={{ marginTop: 30, marginRight: 30, marginLeft: 30 }}
        {...this.props}
      />
    )
  }
}

export default JButton
