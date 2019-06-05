import React from 'react'
import { Layout, Row, Col, Menu, Icon } from 'antd'
import { JHeader, JFooter } from 'components'
import { RouteTo } from 'components/Utils/RouterAction'
const MenuItemGroup = Menu.ItemGroup
const { Content } = Layout

export default class MainLayout extends React.Component {
  state = {
    pageTitle: this.props.pageTitle,
  }

  componentDidMount() {
    this.routeTo(this.props.location.pathname)
  }

  routeTo = toSwitch => {
    switch (toSwitch) {
      case '/admin/users':
        this.setState({ pageTitle: 'manage users' })
        break
      case '/admin/branches':
        this.setState({ pageTitle: 'manage branches' })
        break
      case '/admin/users':
        this.setState({ pageTitle: 'manage users' })
        break
      case '/admin/categories':
        this.setState({ pageTitle: 'manage categories' })
        break
      case '/admin/items':
        this.setState({ pageTitle: 'items master file' })
        break
      case '/admin/settings':
        this.setState({ pageTitle: 'settings' })
        break
      case '/admin/suppliers':
        this.setState({ pageTitle: 'suppliers' })
        break
      case '/admin/inventories':
        this.setState({ pageTitle: 'inventories' })
        break
      case '/admin/modifiers':
        this.setState({ pageTitle: 'modifiers' })
        break
      case '/admin/orders':
        this.setState({ pageTitle: 'orders' })
        break
      default:
        this.setState({ pageTitle: this.props.pageTitle })
        break
    }

    RouteTo(this.props, toSwitch)
  }

  handleClick = e => {
    this.routeTo(e.key)
  }

  render() {
    return (
      <Layout className="layout" style={{ backgroundColor: 'white' }}>
        <JHeader {...this.props} />
        <Content style={{ padding: '0 50px', backgroundColor: 'white', flex: 1 }}>
          <Row>
            <Col span={5}>
              <Menu onClick={this.handleClick} defaultSelectedKeys={[this.props.location.pathname]} mode="inline">
                <MenuItemGroup key="nav" title="NAVIGATION">
                  <Menu.Item key="/admin">
                    <Icon type="home" />Dashboard
                  </Menu.Item>
                  <Menu.Item key="/admin/users">
                    <Icon type="user" />Manage Users
                  </Menu.Item>
                  <Menu.Item key="/admin/branches">
                    <Icon type="shop" />Manage Branches
                  </Menu.Item>
                  <Menu.Item key="/admin/categories">
                    <Icon type="book" />Manage Categories
                  </Menu.Item>
                  <Menu.Item key="/admin/items">
                    <Icon type="rest" />Items Master File
                  </Menu.Item>
                  <Menu.Item key="/admin/modifiers">
                    <Icon type="setting" />Manage Modifiers
                  </Menu.Item>
                  {/* <Menu.Item key="/admin/suppliers">
                    <Icon type="car" />Manage Suppliers
                  </Menu.Item> */}
                  <Menu.Item key="/admin/inventories">
                    <Icon type="setting" />Inventory Mgmt
                  </Menu.Item>
                  <Menu.Item key="/admin/orders">
                    <Icon type="setting" />Manage Orders
                  </Menu.Item>
                  {/* <Menu.Item key="/admin/settings">
                    <Icon type="setting" />Settings
                  </Menu.Item> */}
                </MenuItemGroup>
              </Menu>
            </Col>
            <Col span={19} style={{ padding: 5, paddingLeft: 20 }}>
              <h3 style={{ color: '#096dd9' }}>
                <span style={{ color: 'black' }}>{this.props.role} /</span> {this.state.pageTitle}
              </h3>
              {this.props.children}
            </Col>
          </Row>
        </Content>
        <JFooter />
      </Layout>
    )
  }
}
