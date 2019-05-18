import React from 'react'
import { Row, Col, Button , List} from 'antd'

class SaleCard extends React.Component {
   render() {

      let statusColor = 'warning'

      if(this.props.status === 'processing')
         statusColor = 'info'
      else if(this.props.status === 'done')
         statusColor = 'success'

      let data = [
         { id: 1, qty: 2, item: 'Choco Muffins' },
         { id: 2, qty: 1, item: 'Siopao Bread' },
         { id: 3, qty: 3, item: 'Chocolate Cake' },
      ]

      return (
         <List
            style={{ marginBottom: 10 }}
            size="small"
            header={<strong>{this.props.title}</strong>}
            footer={<div>Footer</div>}
            bordered
            dataSource={data}
            renderItem={item => <List.Item>{item.item}</List.Item>}
         />
      )
   }
}

export default SaleCard
