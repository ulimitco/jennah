import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { JLayout, JText, JInput, JButton } from '../components'
import { NavigationActions } from '../utils'

@connect(({ app }) => ({ ...app }))
class ModalAuth extends Component {
  state = {
    isLogged: true
  }

  componentWillMount(){
    if(this.state.isLogged)
      this.props.dispatch(NavigationActions.navigate({ routeName: 'Main' }))
  }

  render() {
    return (
      <JLayout visible={!this.state.isLogged} modal centered>
        <JText style={{ fontFamily: 'Pacifico', fontSize: 40, color: '#2d2d2d' }}>Estrella Cakes</JText>
        <JInput placeholder={'Enter username'} iconName={'user'} />
        <JInput placeholder={'Enter password'} iconName={'lock'} secureTextEntry />
        <JButton title={'Login'} buttonStyle={{ marginTop: 30, marginRight: 30, marginLeft: 30 }} />
      </JLayout>
    )
  }
}

export default ModalAuth
