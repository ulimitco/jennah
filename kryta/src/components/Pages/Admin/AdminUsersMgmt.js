import React from 'react'
import { Table, Button, Modal, Form, Icon, Alert, notification } from 'antd'
import { _getUsers, _saveUser, _deleteUser } from '../../../rest/users.api'
import { _getBranches } from '../../../rest/branches.api'
import { JInput } from 'components'
import _ from 'lodash'

const confirm = Modal.confirm

class AdminUsersMgmt extends React.Component {
  state = {
    data: [],
    branches: [],
    loading: false,
    visible: false,
    record: {},
    isNewUser: true,
    confirmDirty: false,
    error: false,
    errorMessage: '',
  }

  componentDidMount() {
    this.fetchUsers()
    this.fetchBranches()
  }

  fetchUsers = () => {
    _getUsers(this.populateUsers)
  }

  fetchBranches = () => {
    _getBranches(this.populateBranches)
  }

  populateUsers = data => {
    this.setState({ data })
  }

  populateBranches = branches => {
    this.setState({ branches })
  }

  showModal = () => {
    this.setState({
      visible: true,
    })
  }

  handleOk = () => {
    this.setState({ loading: true })
    setTimeout(() => {
      this.setState({ loading: false, visible: false })
    }, 3000)
  }

  handleCancel = () => {
    this.setState({ visible: false })
    this.props.form.resetFields()
  }

  formSubmit = e => {
    e.preventDefault()
    e.stopPropagation()

    let { activeRecord } = this.props
    this.setState({ loading: true })
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (values.password !== values.confirm) {
          this.setState({ error: true, errorMessage: 'Password did not match', loading: false })
        } else {
          _saveUser(values, this.success)
        }
      }
    })
  }

  onDelete = id => {
    let me = this

    confirm({
      title: 'Delete Confirmation',
      content: 'Are you sure you want to delete this record?',
      onOk() {
        _deleteUser(id, me.deleteSuccess)
      },
      onCancel() {},
    })
  }

  onEdit = record => {
    this.props.form.setFieldsValue({
      name: record.name,
      email: record.email,
      username: record.username,
      branch_id: record.branch_name,
      role: record.role,
    })

    this.setState({ visible: true }, () => console.log(this.state.record))
  }

  deleteSuccess = data => {
    if (data.response === 200) {
      notification.open({
        message: 'Done',
        description: 'User has been successfully deleted',
        duration: 2,
        icon: <Icon type="smile" style={{ color: '#108ee9' }} />,
      })

      this.fetchUsers()
    }
  }

  success = data => {
    if (data.response === 200) {
      this.handleCancel()

      this.setState({ loading: false, record: {}, isNewUser: false })

      this.props.form.resetFields()

      notification.open({
        message: 'Success',
        description: 'User has been successfully added',
        duration: 2,
        icon: <Icon type="smile" style={{ color: '#108ee9' }} />,
      })

      this.fetchUsers()
    }
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!')
    } else {
      callback()
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true })
    }
    callback()
  }

  render() {
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
      },
      {
        title: 'Email',
        dataIndex: 'email',
      },
      {
        title: 'Username',
        dataIndex: 'username',
      },
      {
        title: 'Branch',
        dataIndex: 'branch_name',
        render: (text, row, index) => {
          return row.branch_name + ' (' + row.branch_code + ')'
        },
      },
      {
        title: 'Role',
        dataIndex: 'role',
        render: (text, row, index) => {
          if (text == 1) return 'administrator'
          else return 'user'
        },
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span>
            <Button size={'small'} onClick={() => this.onEdit(record)}>
              <Icon type="edit" />
            </Button>
            <Button size={'small'} type={'danger'} style={{ marginLeft: 3 }} onClick={() => this.onDelete(record.id)}>
              <Icon type="delete" />
            </Button>
          </span>
        ),
      },
    ]

    const { visible, record } = this.state
    const { getFieldDecorator } = this.props.form

    return (
      <div>
        <Button icon="user-add" onClick={this.showModal}>
          Add New User
        </Button>
        <Table columns={columns} dataSource={this.state.data} size="small" style={{ marginTop: 10 }} />

        <Modal
          visible={visible}
          title="Add New User"
          onCancel={this.handleCancel}
          maskClosable={false}
          footer={[
            <Button onClick={this.handleCancel}>Cancel</Button>,
            <Button type="primary" onClick={this.formSubmit} loading={this.state.loading}>
              Save User
            </Button>,
          ]}
        >
          {this.state.error ? (
            <Alert style={{ marginBottom: 16 }} type={'warning'} message={this.state.errorMessage} showIcon />
          ) : null}

          <Form layout={'horizontal'}>
            <JInput
              gfd={getFieldDecorator}
              required
              message={'Please input name of user'}
              name={'name'}
              placeholder={'Enter your fullname'}
              initVal={record.name}
              label={'Name'}
            />

            <JInput
              gfd={getFieldDecorator}
              required
              message={'Please input username'}
              name={'username'}
              placeholder={'Enter your username'}
              initVal={record.username}
              label={'Username'}
            />

            <JInput
              gfd={getFieldDecorator}
              required
              message={'Please input email of user'}
              name={'email'}
              placeholder={'Enter your email'}
              initVal={record.email}
              label={'Email'}
            />

            {this.state.isNewUser
              ? [
                  <JInput
                    gfd={getFieldDecorator}
                    required
                    message={'Please enter password'}
                    name={'password'}
                    placeholder={'Enter your password'}
                    initVal={record.password}
                    label={'Password'}
                    validator={this.validateToNextPassword}
                    type={'password'}
                  />,
                  <JInput
                    gfd={getFieldDecorator}
                    required
                    message={'Please retype your password'}
                    name={'confirm'}
                    placeholder={'Retype your password'}
                    label={'Confirm'}
                    validator={this.compareToFirstPassword}
                    type={'password'}
                  />,
                ]
              : null}

            <JInput
              gfd={getFieldDecorator}
              required
              message={'Please select a branch'}
              name={'branch_id'}
              fieldname={'name'}
              fieldvalue={'id'}
              placeholder={'Select a branch'}
              initVal={record.branch_name || undefined}
              options={this.state.branches}
              type={'select'}
              label={'Branch'}
            />

            <JInput
              gfd={getFieldDecorator}
              required
              message={'Please select a role'}
              name={'role'}
              fieldname={'name'}
              placeholder={'Select user role'}
              initVal={record.role || 'staff'}
              options={[
                { id: 'administrator', name: 'administrator' },
                { id: 'supervisor', name: 'supervisor' },
                { id: 'staff', name: 'staff' },
              ]}
              type={'select'}
              label={'Position'}
            />
          </Form>
        </Modal>
      </div>
    )
  }
}

export default Form.create({ name: 'register' })(AdminUsersMgmt)
