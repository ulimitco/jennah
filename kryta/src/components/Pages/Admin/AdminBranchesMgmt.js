import React from 'react'
import { Table, Button, Modal, Form, Icon, Alert, notification } from 'antd'
import { _getBranches, _saveBranch, _deleteBranch } from '../../../rest/branches.api'
import { JInput } from 'components'
import _ from 'lodash'

const confirm = Modal.confirm

class AdminBranchesMgmt extends React.Component {
  state = {
    data: [],
    loading: false,
    visible: false,
    record: {},
    error: false,
    errorMessage: '',
    mode: 'add',
    selectedID: ''
  }

  componentDidMount() {
    this.fetchBranches()
  }

  fetchBranches = () => {
    _getBranches(this.populateBranches)
  }

  populateBranches = data => {
    this.setState({ data })
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
        let payload = _.clone(values)
        payload.id = this.state.selectedID

        _saveBranch(payload, this.success)
      }
    })
  }

  onDelete = id => {
    let me = this

    confirm({
      title: 'Delete Confirmation',
      content: 'Are you sure you want to delete this record?',
      onOk() {
        _deleteBranch(id, me.deleteSuccess)
      },
      onCancel() {},
    })
  }

  onEdit = record => {
    setTimeout(() => {
      this.props.form.setFieldsValue({
        code: record.code,
        name: record.name,
      })
    }, 500)


    this.setState({ visible: true, mode: 'edit', selectedID: record.id })
  }

  deleteSuccess = data => {
    if (data.response === 200) {
      notification.open({
        message: 'Done',
        description: 'Branch has been successfully deleted',
        duration: 2,
        icon: <Icon type="smile" style={{ color: '#108ee9' }} />,
      })

      this.fetchBranches()
    }
  }

  success = data => {
    if (data.response === 200) {
      this.handleCancel()

      this.setState({ loading: false, record: {}, selectedID: 0 })

      this.props.form.resetFields()

      notification.open({
        message: 'Success',
        description: 'Branch has been successfully added',
        duration: 2,
        icon: <Icon type="smile" style={{ color: '#108ee9' }} />,
      })

      this.fetchBranches()
    }
  }

  render() {
    const columns = [
      {
        title: 'Code',
        dataIndex: 'code',
      },
      {
        title: 'Name',
        dataIndex: 'name',
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
          Add New Branch
        </Button>
        <Table columns={columns} dataSource={this.state.data} size="small" style={{ marginTop: 10 }} />

        <Modal
          visible={visible}
          title="Add New Branch"
          onCancel={this.handleCancel}
          maskClosable={false}
          footer={[
            <Button onClick={this.handleCancel}>Cancel</Button>,
            <Button type="primary" onClick={this.formSubmit} loading={this.state.loading}>
              Save Branch
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
              message={'Enter branch shortname'}
              name={'code'}
              placeholder={'Enter Branch Shortname'}
              initVal={record.code}
              label={'Code'}
            />

            <JInput
              gfd={getFieldDecorator}
              required
              message={'Please input branch name'}
              name={'name'}
              placeholder={'Enter Name of Branch'}
              initVal={record.name}
              label={'name'}
            />

          </Form>
        </Modal>
      </div>
    )
  }
}

export default Form.create({ name: 'branches' })(AdminBranchesMgmt)
