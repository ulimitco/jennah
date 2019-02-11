import React from 'react'
import { Row, Col, Button, Statistic, Icon } from 'antd'
import { RangePicker } from 'components'

class ValueCard extends React.Component {
  render() {
    return <Statistic title={this.props.title} value={this.props.value} prefix={<Icon type="like" />} />
  }
}

export default ValueCard
