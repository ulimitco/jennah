import React from 'react'
import { Row, Col, Card } from 'antd'
import { SaleCard } from 'components'
import { _getSales } from '../../../rest/sales.api'
import _ from 'lodash'

class AdminOrders extends React.Component {
   state = {
      pending: [],
      processing: [],
      done: []
   }

   componentDidMount() {
      this.fetchOrders()
   }

   fetchOrders = () => {
      _getSales(this.fetchSuccess)
   }

   fetchSuccess = orders => {
      
      let pending = _.filter(orders, p => p.Order.sale_status == 'PENDING')
      let processing = _.filter(orders, p => p.Order.sale_status == 'PROCESSING')
      let done = _.filter(orders, p => p.Order.sale_status == 'DONE')

      this.setState({
         pending,
         processing,
         done
      })
   }

   render() {
      return <div>
         <Row style={{ marginBottom: 10 }}>
         <Col span={8} style={{ paddingRight: 5 }}>

            <Card size="small" title={<strong>Pending Orders</strong>}>
               {
                  _.map(this.state.pending.Order, sale => {
                     return <SaleCard title={sale.sale_no} status={'pending'} />
                  })
               }
            </Card>

         </Col>
         <Col span={8} style={{ paddingRight: 5 }}>
            <Card size="small" title={<strong>Processing Orders</strong>}>
               {
                  _.map(this.state.processing.Order, sale => {
                     return <SaleCard title={sale.sale_no} status={'processing'} />
                  })
               }
            </Card>
         </Col>
         <Col span={8}>
            <Card size="small" title={<strong>Done Orders</strong>}>
               {
                  _.map(this.state.done.Order, sale => {
                     return <SaleCard title={sale.sale_no} status={'done'} />
                  })
               }
            </Card>
         </Col>
         </Row>
      </div>
   }
}

export default AdminOrders
