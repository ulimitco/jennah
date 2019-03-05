import React, { Component } from 'react'
import { Button, Icon } from 'react-native-elements';

class JButton extends Component {
  render() {
    return (
      <Button
        title={this.props.title}
        containerStyle={{ width: '100%' }}
        buttonStyle={this.props.buttonStyle}
        onPress={this.props.onPress}
        {...this.props}
        icon={
          <Icon
            name={this.props.iconTitle}
            size={15}
            color={'black'}
            type={'feather'}
          />
        }
      />
    )
  }
}

export default JButton
