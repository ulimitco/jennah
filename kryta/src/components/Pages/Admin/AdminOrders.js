import React from 'react'
import { Row, Col, Card } from 'antd'
import { SaleCard } from 'components'
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
         <Row style={{ marginBottom: 10 }}>
         <Col span={8} style={{ paddingRight: 5 }}>

            <Card size="small" title={<strong>Pending Orders</strong>}>
               {
                  _.map(this.state.pending, sale => {
                     return <SaleCard title={sale.sale_no} />
                  })
               }
            </Card>

         </Col>
         <Col span={8} style={{ paddingRight: 5 }}>
            <Card size="small" title={<strong>Processing Orders</strong>}>
               {
                  _.map(this.state.processing, sale => {
                     return <SaleCard title={sale.sale_no} />
                  })
               }
            </Card>
         </Col>
         <Col span={8}>
            <Card size="small" title={<strong>Done Orders</strong>}>
               {
                  _.map(this.state.done, sale => {
                     return <SaleCard title={sale.sale_no} />
                  })
               }
            </Card>
         </Col>
         </Row>
      </div>
   }
}

export default AdminOrders
