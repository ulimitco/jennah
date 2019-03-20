import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { JLayout, JText, JInput, JButton } from '../components'
import { NavigationActions } from '../utils'
import Realm from '../datastore'
import _ from 'lodash'

let authObject = Realm.objects('Auth')

@connect(({ app }) => ({ ...app }))
class ModalAuth extends Component {
  
  state = {
    isLogged: false
  }

  tryLogin = () => {
    if(!_.isEmpty(authObject)){
      this.setState({ isLogged: true })
      this.props.dispatch(NavigationActions.navigate({ routeName: 'Main' }))
    }
    else {
      this.setState({ isLogged: false })
      alert("Invalid Credentials")
    }
  }

  handleChange = (key, value) => {
    this.setState({ [key]: value })
  }

  login = () => {
    this.props.dispatch({
      type: 'app/login',
      payload: {
        username: this.state.username,
        password: this.state.password
      },
      callback: this.tryLogin
    })
  }

  render() {
    
    return (
      <JLayout visible={!this.state.isLogged} modal centered>
        <JText style={{ fontFamily: 'Pacifico', fontSize: 40, color: '#2d2d2d' }}>Test App</JText>
        
        <JInput 
          placeholder={'Enter username'} 
          iconName={'user'}
          onChangeText={text => this.handleChange('username', text)}
          autoCapitalize={'none'}
        />

        <JInput 
          placeholder={'Enter password'} 
          iconName={'lock'}
          onChangeText={text => this.handleChange('password', text)}
          secureTextEntry 
        />
        
        <JButton title={'Login'} onPress={() => this.login()} buttonStyle={{ marginTop: 30, marginRight: 30, marginLeft: 30 }} />
      </JLayout>
    )
  }
}

export default ModalAuth
