import React, { Component } from 'react'
import { Text } from 'react-native'
import { connect } from 'react-redux'

import { JText, JLayout, JInput } from '../components'

import { NavigationActions } from '../utils'

@connect(({ app }) => ({ ...app }))
class Main extends Component {

  gotoDetail = () => {
    this.props.dispatch(NavigationActions.navigate({ routeName: 'Detail' }))
  }

  render() {
    return (
      <JLayout centered>
        <JText>Welcome to Mainpage</JText>
      </JLayout>
    )
  }
}

export default Main
