import React from 'react'
import { Form, Select, Icon, Input, Row, Col } from 'antd'
import _ from 'lodash'

const FormItem = Form.Item
const Option = Select.Option

class JInput extends React.Component {
  render() {
    if (this.props.type === 'select') {
      let formOptions = _.map(this.props.options, item => {
        return (
          <Option
            key={item.id.toString() + this.props.idSuffix}
            value={item[this.props.fieldvalue ? this.props.fieldvalue : this.props.fieldname]}
          >
            {item[this.props.fieldname]}
          </Option>
        )
      })

      let labelAlign = this.props.labelAlign ? this.props.labelAlign : 'left'

      return (
        <Row>
          <Col span={6} style={{ paddingTop: 6, textAlign: labelAlign }}>
            <span>{this.props.label}</span>
          </Col>
          <Col span={18}>
            <FormItem style={{ marginBottom: 5 }}>
              {this.props.gfd(this.props.name, {
                rules: [{ required: this.props.required, message: this.props.message }],
                initialValue: this.props.initVal,
              })(<Select placeholder={this.props.placeholder}>{formOptions}</Select>)}
            </FormItem>
          </Col>
        </Row>
      )
    }

    return (
      <Row>
        <Col span={6} style={{ paddingTop: 6 }}>
          <span>{this.props.label}</span>
        </Col>
        <Col span={18}>
          <FormItem style={{ marginBottom: 5 }}>
            {this.props.gfd(this.props.name, {
              rules: [
                { required: this.props.required, message: this.props.message },
                { validator: this.props.validator },
              ],
              initialValue: this.props.initVal,
            })(
              <Input
                type={this.props.type}
                prefix={<Icon type="edit" style={{ fontSize: 13 }} />}
                placeholder={this.props.placeholder}
                style={{ textTransform: 'uppercase' }}
              />
            )}
          </FormItem>
        </Col>
      </Row>
    )
  }
}

export default JInput
