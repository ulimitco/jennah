import React from 'react'
import { Form, Icon, Input, Button, Row, Col, Alert } from 'antd'
import axios from 'axios'
import _ from 'lodash'
import { RouteTo, IP_ADDRESS } from 'components/Utils/RouterAction'

const FormItem = Form.Item

class Auth extends React.Component {
  state = {
    wrongPassword: false,
    logoutSuccessful: false,
  }

  componentDidMount() {
    if (_.get(this.props.location.state, 'logoutSuccessful')) {
      if (this.props.location.state.logoutSuccessful) this.setState({ logoutSuccessful: true })
    }
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let formDataRaw = {
          username: values.userName,
          password: values.password,
        }

        axios
          .post('http://' + IP_ADDRESS + '/login?username=' + values.userName + '&password=' + values.password)
          .then(response => {
            console.log(response)
            if (response.data.response.status === 200) {
              localStorage.setItem('access_token', response.data.response.access_token)
              localStorage.setItem('username', values.userName)
              //localStorage.setItem('bx', response.data.bx)
              localStorage.setItem('rx', response.data.response.rx)

              _.delay(() => {
                if (response.data.response.rx == 'administrator') {
                  RouteTo(this.props, '/admin')
                } else {
                  RouteTo(this.props, '/branch')
                }
              }, 500)
            } else {
              this.setState({ wrongPassword: true })
            }
          })
          .catch(e => {
            console.log('Error: ', e)
          })
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Row style={{ marginTop: '10%' }}>
        <Col span={8} offset={8}>
          <h1>
            KRYTA | <span style={{ color: '#096dd9' }}>LOGIN</span>
          </h1>

          {this.state.logoutSuccessful ? <Alert message="Successful logout" type="success" showIcon /> : null}

          {this.state.wrongPassword ? <Alert message="Wrong email or password" type="error" showIcon /> : null}

          <Form onSubmit={this.handleSubmit} style={{ marginTop: 50 }}>
            <FormItem>
              {getFieldDecorator('userName', {
                rules: [{ required: true, message: 'Please input your username!' }],
              })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />)}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="Password"
                />
              )}
            </FormItem>
            <FormItem>
              <Button type="primary" htmlType="submit" style={{ width: 200 }}>
                Log in
              </Button>
            </FormItem>
          </Form>
        </Col>
      </Row>
    )
  }
}

const WrappedNormalLoginForm = Form.create()(Auth)
export default WrappedNormalLoginForm
