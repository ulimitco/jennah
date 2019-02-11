import React from 'react'
import { Table, Button, Modal, Form, Icon, Alert, notification } from 'antd'
import { _getCategories, _saveCategory, _deleteCategory } from '../../../rest/categories.api'
import { JInput } from 'components'
import _ from 'lodash'

const confirm = Modal.confirm

class AdminCategoriesMgmt extends React.Component {
  state = {
    data: [],
    loading: false,
    visible: false,
    record: {},
    error: false,
    errorMessage: '',
  }

  componentDidMount() {
    this.fetchCategories()
  }

  fetchCategories = () => {
    _getCategories(this.populateCategories)
  }

  populateCategories = data => {
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
        _saveCategory(values, this.success)
      }
    })
  }

  onDelete = id => {
    let me = this

    confirm({
      title: 'Delete Confirmation',
      content: 'Are you sure you want to delete this record?',
      onOk() {
        _deleteCategory(id, me.deleteSuccess)
      },
      onCancel() {},
    })
  }

  onEdit = record => {
    this.props.form.setFieldsValue({
      code: record.code,
      description: record.description,
    })

    this.setState({ visible: true }, () => console.log(this.state.record))
  }

  deleteSuccess = data => {
    if (data.response === 200) {
      notification.open({
        message: 'Done',
        description: 'Category has been successfully deleted',
        duration: 2,
        icon: <Icon type="smile" style={{ color: '#108ee9' }} />,
      })

      this.fetchCategories()
    }
  }

  success = data => {
    if (data.response === 200) {
      this.handleCancel()

      this.setState({ loading: false, record: {} })

      this.props.form.resetFields()

      notification.open({
        message: 'Success',
        description: 'Category has been successfully added',
        duration: 2,
        icon: <Icon type="smile" style={{ color: '#108ee9' }} />,
      })

      this.fetchCategories()
    }
  }

  render() {
    const columns = [
      {
        title: 'Code',
        dataIndex: 'code',
      },
      {
        title: 'Description',
        dataIndex: 'description',
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
          Add New Category
        </Button>
        <Table columns={columns} dataSource={this.state.data} size="small" style={{ marginTop: 10 }} />

        <Modal
          visible={visible}
          title="Add New Category"
          onCancel={this.handleCancel}
          maskClosable={false}
          footer={[
            <Button onClick={this.handleCancel}>Cancel</Button>,
            <Button type="primary" onClick={this.formSubmit} loading={this.state.loading}>
              Save Category
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
              message={'Enter category shortname'}
              name={'code'}
              placeholder={'Enter Category Shortname'}
              initVal={record.code}
              label={'Code'}
            />

            <JInput
              gfd={getFieldDecorator}
              required
              message={'Please input category'}
              name={'description'}
              placeholder={'Enter category'}
              initVal={record.description}
              label={'description'}
            />
          </Form>
        </Modal>
      </div>
    )
  }
}

export default Form.create({ name: 'categories' })(AdminCategoriesMgmt)
