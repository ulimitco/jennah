import React from 'react'
import { Layout, Menu, Breadcrumb, Icon, Row, Col, Tabs } from 'antd'
import { MainLayout, JHeader, JFooter } from 'components'

import { Route } from 'react-router-dom'
import { RouteTo } from 'components/Utils/RouterAction'

const { SubMenu } = Menu
const { Content, Sider, Footer } = Layout
const TabPane = Tabs.TabPane

export default class BranchContainer extends React.Component {
  handleClick = e => {
    RouteTo(this.props, e.key)
  }
  render() {
    let branchID = this.props.match.params.id

    return (
      <MainLayout pageTitle="dashboard" role="supervisor" {...this.props}>
        Branch Pages
      </MainLayout>
    )
  }
}
