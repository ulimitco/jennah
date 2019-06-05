import React from 'react'
import { Row, Col, Button, List, Popover } from 'antd'
import moment from 'moment'

class SaleCard extends React.Component {
   state = {
      visible: false
   }

   handleVisibleChange = visible => {
      this.setState({ visible })
   }

   render() {

      return (
         <List
            style={this.props.style}
            size="small"
            header={
               <Row>
                  <Col span={20}>
                     PDT: <strong>{moment(this.props.data.sale_datetime).format("MM/DD HH:mmA")}</strong> at <strong>{this.props.data.sale_dispense_location}</strong>
                  </Col>
                  <Col span={4} style={{ textAlign: 'right' }}>
                     <Popover 
                        content={this.props.content}
                        trigger="click"
                        visible={this.state.visible}
                        onVisibleChange={this.handleVisibleChange}
                        >
                        {this.props.icon}
                     </Popover>
                  </Col>
               </Row>
            }
            footer={<div>{this.props.data.sale_details}</div>}
            bordered
            dataSource={this.props.data.SaleItems}
            renderItem={item => <List.Item>{item.qty} x <strong>{item.item}</strong></List.Item>}
         />
      )
   }
}

export default SaleCard
