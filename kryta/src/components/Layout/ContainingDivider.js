import React from 'react'
import { Divider } from 'antd'

class ContainingDivider extends React.Component {
  render() {
    return (
      <div>
        <Divider style={{ marginTop: 7, marginBottom: 7 }} />
        {this.props.children}
        <Divider style={{ marginTop: 7, marginBottom: 7 }} />
      </div>
    )
  }
}

export default ContainingDivider
