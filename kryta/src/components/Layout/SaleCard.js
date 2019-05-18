import React from 'react'
import { Row, Col, Button , Alert} from 'antd'

class SaleCard extends React.Component {
  render() {
    return (
      <Alert
        style={{ marginBottom: 10 }}
        message={this.props.title}
        type="info"
      />
    )
  }
}

export default SaleCard
