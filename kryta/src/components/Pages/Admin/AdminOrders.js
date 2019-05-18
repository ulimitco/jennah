import React from 'react'
import { Row, Col, Card, Icon } from 'antd'
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

      let pending = _.filter(orders, p => p.sale_status === 'PENDING')
      let processing = _.filter(orders, p => p.sale_status === 'PROCESSING')
      let done = _.filter(orders, p => p.sale_status === 'DONE')

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

            <Card size="small" title={<strong style={{ color: '#eb2f96' }}>Pending Orders</strong>}>
               {
                  _.map(this.state.pending, sale => {
                     return <SaleCard data={sale} status={'pending'} icon={<a href='#' onClick={() => alert("Pending")}><Icon type='setting' theme='twoTone' twoToneColor='#eb2f96' /></a>} />
                  })
               }
            </Card>

         </Col>
         <Col span={8} style={{ paddingRight: 5 }}>
            <Card size="small" title={<strong style={{ color: 'blue' }}>Processing Orders</strong>}>
               {
                  _.map(this.state.processing, sale => {
                  return <SaleCard data={sale} status={'processing'} icon={<a href='#' onClick={() => alert("Processing")}><Icon type='setting' theme='twoTone' twoToneColor='blue' /></a>} />
                  })
               }
            </Card>
         </Col>
         <Col span={8}>
            <Card size="small" title={<strong style={{ color: 'green' }}>Done Orders</strong>}>
               {
                  _.map(this.state.done, sale => {
                     return <SaleCard data={sale} status={'done'} icon={<a href='#' onClick={() => alert("Done")}><Icon type='setting' theme='twoTone' twoToneColor='green' /></a>} />
                  })
               }
            </Card>
         </Col>
         </Row>
      </div>
   }
}

export default AdminOrders
