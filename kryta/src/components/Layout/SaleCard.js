import React from 'react'
import { Row, Col, Button , List} from 'antd'
import moment from 'moment'

class SaleCard extends React.Component {
   render() {

      return (
         <List
            style={{ marginBottom: 10 }}
            size="small"
            header={<div>PDT: <strong>{moment(this.props.data.sale_datetime).format("MM/DD/YYYY HH:mmA")}</strong></div>}
            footer={<div>{this.props.data.sale_details}</div>}
            bordered
            dataSource={this.props.data.SaleItems}
            renderItem={item => <List.Item>{item.qty} x <strong>{item.item}</strong></List.Item>}
         />
      )
   }
}

export default SaleCard
