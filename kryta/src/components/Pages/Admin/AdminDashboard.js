import React from 'react'
import { Row, Col } from 'antd'
import { ValueCard, AreaChartOne } from 'components'

class AdminDashboard extends React.Component {
  render() {
    return (
      <div>
        <Row style={{ marginTop: 30 }}>
          <Col span={12}>
            <Row>
              <Col span={12}>
                <ValueCard title={'GROSS INCOME'} value={'1,329,938.32'} />
              </Col>
              <Col span={12}>
                <ValueCard title={'TOTAL DISCOUNTS'} value={'1,329,938.32'} />
              </Col>
            </Row>
          </Col>
          <Col span={12} style={{ textAlign: 'right' }}>
            <ValueCard title={'NET INCOME'} value={'1,329,938.32'} />
          </Col>
        </Row>

        <Row>
          <Col span={12} style={{ width: '100%', height: 300 }}>
            <AreaChartOne />
          </Col>
        </Row>
      </div>
    )
  }
}

export default AdminDashboard
