import React from 'react'
import { Button, Menu, Layout, Row, Col, Dropdown, Icon, Modal, Divider } from 'antd'
import _ from 'lodash'
import axios from 'axios'
import { RouteTo, ActOnBranch } from 'components/Utils/RouterAction'

const { SubMenu } = Menu
const { Header, Content, Sider, Footer } = Layout

export default class JFooter extends React.Component {
  render() {
    return (
      <Footer style={{ width: '100%', backgroundColor: 'white' }}>
        <Divider style={{ marginBottom: 10, marginTop: 10 }} />

        <Row>
          <Col span={12}>
            <b>INVENTORY</b> ©2019 <Divider type={'vertical'} />
            <p style={{ display: 'inline-block', color: '#d0d0d0' }}>KRYTA</p>
          </Col>
          <Col span={12} style={{ textAlign: 'right' }}>
            by <b>uLimit</b>
          </Col>
        </Row>
      </Footer>
    )
  }
}
