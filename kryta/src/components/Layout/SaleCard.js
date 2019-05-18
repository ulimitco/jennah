import React from 'react'
import { Row, Col, Button } from 'antd'

class SaleCard extends React.Component {
  render() {
    return (
      <Row style={{ border: '1px solid blue', padding: 5, borderRadius: 2 }}>
        <Col span={24}>
          <h4>{this.props.title}</h4>
        </Col>
      </Row>
    )
  }
}

export default SaleCard
