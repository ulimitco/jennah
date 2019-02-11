import React from 'react'
import { Row, Col, Button } from 'antd'
import { RangePicker } from 'components'

class TitleBar extends React.Component {
  render() {
    return (
      <Row>
        <Col span={12}>
          <h2>{this.props.title}</h2>
        </Col>
        <Col span={12} style={{ textAlign: 'right' }}>
          <RangePicker />
          <Button type="primary" onClick={this.props.filterClicked}>
            Filter
          </Button>
        </Col>
      </Row>
    )
  }
}

export default TitleBar
