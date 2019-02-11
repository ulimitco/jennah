import React from 'react'
import { Col, Row, Button } from 'antd'
import { connect } from 'react-redux'

import { RangePicker } from '../../'

class BranchDashboard extends React.Component {
  componentDidMount() {}

  getBranchWithDetails = () => {}

  filterClicked = () => {}

  render() {
    return (
      <div>
        <Row>
          <Col span={24}>
            <h2>Branch Overview</h2>
          </Col>
        </Row>

        <RangePicker />
        <Button onClick={this.filterClicked}>Filter</Button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    activeRecord: state.branches.activeRecord,
    dates: state.dates,
  }
}

function mapDispatchToProps(dispatch) {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(BranchDashboard)
