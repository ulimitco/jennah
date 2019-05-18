import React from 'react'
import { Redirect, withRouter } from 'react-router'
import _ from 'lodash'
import { Auth, AccessDenied } from 'containers'

let checkAuth = !_.isEmpty(localStorage.getItem('access_token')) ? true : false
const RouteTo = (props, path) => {
  props.history.push(path)
}

const CheckAuthentication = (Component, AllowedRoles) => {
  if (!_.isEmpty(localStorage.getItem('rx'))) {
    let uxRx = localStorage.getItem('rx')

    if (_.indexOf(AllowedRoles, uxRx) == -1) {
      return <Redirect to="/denied" />
    }
  }

  return !_.isEmpty(localStorage.getItem('access_token')) ? Component : <Redirect to="/login" />
}

const ActOnBranch = (method, name = null, value = null) => {
  if (method === 'get') {
    localStorage.getItem(name, value)
  } else if (method === 'set') {
    localStorage.setItem(name, value)
  } else if (method === 'clear') {
    localStorage.clear()
  }
}

const IP_ADDRESS = 'localhost:8080'

export { RouteTo, CheckAuthentication, ActOnBranch, IP_ADDRESS }
