import React from 'react'
import { Layout, Menu, Breadcrumb, Icon, Row, Col } from 'antd'
import { JHeader } from 'components'

export default class AccessDenied extends React.Component {
  render() {
    return (
      <div>
        <JHeader {...this.props} />
        <h3>Unable to Access This Page</h3>
      </div>
    )
  }
}
