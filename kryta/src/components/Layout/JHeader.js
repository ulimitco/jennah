import React from 'react'
import { Button, Menu, Layout, Row, Col, Dropdown, Icon, Modal } from 'antd'
import _ from 'lodash'
import axios from 'axios'
import { RouteTo, ActOnBranch, IP_ADDRESS } from 'components/Utils/RouterAction'

const { SubMenu } = Menu
const { Header, Content, Sider, Footer } = Layout

export default class JHeader extends React.Component {
  state = {
    controls: [],
    visible: false,
  }
  showModal = () => {
    this.setState({
      visible: true,
    })
  }

  handleOk = e => {
    console.log(e)
    this.setState({
      visible: false,
    })
  }

  handleCancel = e => {
    console.log(e)
    this.setState({
      visible: false,
    })
  }

  logout = () => {
    ActOnBranch('clear')
    RouteTo(this.props, '/login')

    // let instance = axios.create({
    //   baseURL: 'http://' + IP_ADDRESS,
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: 'Bearer ' + localStorage.getItem('access_token'),
    //   },
    // })

    // instance
    //   .post('http://' + IP_ADDRESS + '/api/trylogout')
    //   .then(response => {
    //     ActOnBranch('clear')
    //     RouteTo(this.props, '/login')
    //   })
    //   .catch(e => {
    //     console.log('Error: ', e)
    //   })
  }

  itemSelect = data => {
    switch (data.key) {
      case 'logout':
        this.logout()
        break
      case 'changepass':
        this.showModal()
        break
      default:
        console.log('Switch')
        break
    }
  }

  render() {
    const menu = (
      <Menu onClick={this.itemSelect}>
        <Menu.Item key="changepass">Change password</Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout">Logout</Menu.Item>
      </Menu>
    )

    return (
      <div>
        <Header style={{ backgroundColor: 'white' }}>
          <Row>
            <Col span={12}>
              <h3>
                KRYTA | <span style={{ color: '#096dd9' }}>INVENTORY</span>
              </h3>
            </Col>
            <Col span={12} style={{ textAlign: 'right' }}>
              <Dropdown overlay={menu}>
                <a className="ant-dropdown-link">
                  {localStorage.getItem('username')} <Icon type="down" />
                </a>
              </Dropdown>
            </Col>
          </Row>
        </Header>
        <Modal title="Change Password" visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel}>
          Content Here
        </Modal>
      </div>
    )
  }
}
