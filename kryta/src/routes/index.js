import React from 'react'
import { AdminContainer, BranchContainer, Auth, AccessDenied, Homepage } from 'containers'
import { Header } from 'components'
import { RouteTo, CheckAuthentication } from 'components/Utils/RouterAction'

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import styled from 'styled-components'
import { DecideWhere } from '../components/Utils/RouterAction'

const Container = styled.div`
  text-align: center;
`

function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={Auth} />

        <Route
          path="/admin"
          render={props => CheckAuthentication(<AdminContainer {...props} />, ['administrator', 'supervisor'])}
        />
        <Route
          path="/branch"
          render={props =>
            CheckAuthentication(<BranchContainer {...props} />, ['administrator', 'supervisor', 'staff'])
          }
        />
        <Route component={AccessDenied} />
      </Switch>
    </Router>
  )
}

export default Routes
