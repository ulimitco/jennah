import React from 'react'
import { Row, Col, Card, Icon, Button } from 'antd'
import { SaleCard } from 'components'
import { _getSales, _updateSaleStatus } from '../../../rest/sales.api'
import _ from 'lodash'

class AdminOrders extends React.Component {
   state = {
      pending: [],
      processing: [],
      done: [],
      orders: []
   }

   componentDidMount() {
      this.fetchOrders()
   }

   fetchOrders = () => {
      _getSales(this.fetchSuccess)
   }

   fetchSuccess = orders => {

      let processing = _.filter(orders, p => p.sale_status === 'PENDING' || p.sale_status === 'PROCESSING')
      let done = _.filter(orders, p => p.sale_status === 'DONE')

      this.setState({
         processing,
         done
      })
   }

   processOrder = (saleID, status) => {

      let payload = {
         saleID,
         status
      }

      _updateSaleStatus(payload, this.fetchOrders)
   }

   render() {

      return <div>
         <Row style={{ marginBottom: 10 }}>
            <Col span={12} style={{ paddingRight: 5 }}>
               <Card size="small" title={<strong style={{ color: 'blue' }}>Branch Orders</strong>}>
                  {
                     _.map(this.state.processing, sale => {

                     let pendingContent = (
                        <div style={{ width: 250 }}>
                           {
                              sale.sale_status === 'PENDING' ? <Button style={{ width: '100%', marginBottom: 5 }} onClick={() => this.processOrder(sale.id, 'PROCESSING')}>Acknowledge and Process</Button> : null
                           }

                           {
                              sale.sale_status === 'PROCESSING' ? <Button style={{ width: '100%', marginBottom: 5 }} onClick={() => this.processOrder(sale.id, 'DONE')}>Order is Done</Button> : null
                           }
                           
                           
                        </div>
                     )

                     let borderColor = 'blue'
                     
                     if(sale.sale_status === 'PROCESSING')
                        borderColor = '#f44542'

                     return <SaleCard 
                           style={{ borderColor, marginBottom: 10 }}
                           content={pendingContent}
                           data={sale} 
                           status={'processing'} 
                           icon={
                              <a href='#'>
                                 <Icon type='setting' theme='twoTone' twoToneColor={borderColor} />
                              </a>
                           } 
                        />
                     })
                  }
               </Card>
            </Col>
            <Col span={12}>
               <Card size="small" title={<strong style={{ color: 'green' }}>Done Orders</strong>}>
                  {
                     _.map(this.state.done, sale => {

                        let doneContent = (
                           <div style={{ width: 250 }}>
                              <Button style={{ width: '100%', marginBottom: 5 }} onClick={() => this.processOrder(sale.id, 'PROCESSING')}>Return To Processing</Button>
                           </div>
                        )

                        return <SaleCard 
                              style={{ borderColor: 'green', marginBottom: 10 }} 
                              data={sale} 
                              status={'done'}
                              content={doneContent}
                              icon={
                                 <a href='#'>
                                    <Icon type='setting' theme='twoTone' twoToneColor='green' />
                                 </a>
                              } 
                           />
                     })
                  }
               </Card>
            </Col>
         </Row>
      </div>
   }
}

export default AdminOrders
