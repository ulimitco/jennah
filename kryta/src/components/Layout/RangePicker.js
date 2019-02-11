import React from 'react'
import { DatePicker } from 'antd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { twentyFourFormat } from 'constants/dateFormat'
import * as datesActions from 'actions/datesActions'
import _ from 'lodash'
import moment from 'moment'

class RangePicker extends React.Component {
  state = {
    startValue: null,
    endValue: null,
  }

  onStartChange = value => {
    this.props.datesActions.changeStartDate(value)
    this.setState({ startValue: value })
  }

  onEndChange = value => {
    this.props.datesActions.changeEndDate(value)
    this.setState({ endValue: value })
  }

  render() {
    const { startValue, endValue } = this.state
    return (
      <div style={{ display: 'inline-block' }}>
        <DatePicker
          disabledDate={this.disabledStartDate}
          showTime
          format={twentyFourFormat}
          value={moment(this.props.fromDate)}
          placeholder="From"
          onChange={this.onStartChange}
          style={{ marginRight: 5 }}
        />

        <DatePicker
          disabledDate={this.disabledEndDate}
          showTime
          format={twentyFourFormat}
          value={moment(this.props.toDate)}
          placeholder="To"
          onChange={this.onEndChange}
          style={{ marginRight: 5 }}
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    fromDate: state.dates.fromDate,
    toDate: state.dates.toDate,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    datesActions: bindActionCreators(datesActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RangePicker)
