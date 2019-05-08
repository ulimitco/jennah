import React from 'react'
import { Row, Col, Card } from 'antd'
import { _getSales } from '../../../rest/sales.api'
import _ from 'lodash'

class AdminOrders extends React.Component {
  state = {
    pending: [],
    processing: [],
    fordelivery: [],
    done: []
  }

  componentDidMount() {
    this.fetchOrders()
  }

  fetchOrders = () => {
    _getSales(this.fetchSuccess)
  }

  fetchSuccess = orders => {

    let pending = _.filter(orders, p => p.sale_status == 'PENDING')
    let processing = _.filter(orders, p => p.sale_status == 'PROCESSING')
    let fordelivery = _.filter(orders, p => p.sale_status == 'FOR_DELIVERY')
    let done = _.filter(orders, p => p.sale_status == 'DONE')

    this.setState({
      pending,
      processing,
      fordelivery,
      done
    })
  }

  render() {
    return <div>
      <Row>
        <Col span={6} style={{ paddingRight: 5 }}>
          <Card
            size="small"
            title="Pending Orders"
            style={{ width: '100%' }}
          >
            {
              _.map(this.state.pending, sale => {
                return <p>{sale.sale_no}</p>
              })
            }
          </Card>
        </Col>
        <Col span={6} style={{ paddingRight: 5 }}>
          <Card
            size="small"
            title="Processing Orders"
            style={{ width: '100%' }}
          >
            {
              _.map(this.state.processing, sale => {
                return <p>{sale.sale_no}</p>
              })
            }

          </Card>
        </Col>
        <Col span={6} style={{ paddingRight: 5 }}>
          <Card
            size="small"
            title="For Pickup"
            style={{ width: '100%' }}
          >
            {
              _.map(this.state.fordelivery, sale => {
                return <p>{sale.sale_no}</p>
              })
            }

          </Card>
        </Col>
        <Col span={6}>
          <Card
            size="small"
            title="Delivered"
            style={{ width: '100%' }}
          >
            {
              _.map(this.state.done, sale => {
                return <p>{sale.sale_no}</p>
              })
            }

          </Card>
        </Col>
      </Row>
    </div>
  }
}

export default AdminOrders
