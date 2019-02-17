import React, { Component } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';


class JInput extends Component {
  render() {

    //borderWidth: 1, borderColor: '#515151', borderRadius: 5

    return (
        <Input
            containerStyle={{ paddingLeft: 30, paddingRight: 30 }}
            placeholder={this.props.placeholder}
            inputContainerStyle={{ margin: 10 }}
            inputStyle={{ textTransform: 'lowercase' }}
            leftIcon={{ type: 'feather', name: this.props.iconName }}
            leftIconContainerStyle={{ marginRight: 10 }}
            shake={true}
            {...this.props}
        />
    )
  }
}

export default JInput
