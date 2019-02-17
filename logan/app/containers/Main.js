import React, { Component } from 'react'
import { Text } from 'react-native'
import { connect } from 'react-redux'

import { JButton, JLayout, JInput } from '../components'

import { NavigationActions } from '../utils'

@connect(({ app }) => ({ ...app }))
class Home extends Component {
  gotoDetail = () => {
    this.props.dispatch(NavigationActions.navigate({ routeName: 'Detail' }))
  }

  render() {
    return (
      <JLayout centered>
        <Text style={{ fontFamily: 'Pacifico', fontSize: 50, color: '#2d2d2d' }}>Estrella Cakes</Text>
        <JInput placeholder={'Enter username'} iconName={'user'} />
        <JInput placeholder={'Enter password'} iconName={'lock'} secureTextEntry />
        <JButton title={'Login'} />
      </JLayout>
    )
  }
}

export default Home
