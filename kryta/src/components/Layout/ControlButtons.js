import React from 'react'
import { Button } from 'antd'
import _ from 'lodash'

export default class ControlButtons extends React.Component {
  state = {
    controls: [],
  }
  componentDidMount() {
    if (!_.isEmpty(this.props.buttons)) {
      var controls = _.map(this.props.buttons, (control, i) => {
        return (
          <Button key={'cntrl_' + i} onClick={control.action} style={{ marginRight: 5 }} disabled={control.disabled}>
            {control.title}
          </Button>
        )
      })

      this.setState({ controls })
    }
  }
  render() {
    return <div style={{ display: 'inline-block', marginBottom: 10 }}>{this.state.controls}</div>
  }
}
