import React from 'react'
import { Table, Button, Modal, Form, Icon, Alert, notification } from 'antd'
import { _getSuppliers, _saveSupplier, _deleteSupplier } from '../../../rest/suppliers.api'
import { JInput } from 'components'
import _ from 'lodash'

const confirm = Modal.confirm

class AdminSuppliersMgmt extends React.Component {
  state = {
    data: [],
    loading: false,
    visible: false,
    record: {},
    error: false,
    errorMessage: '',
  }

  componentDidMount() {
    this.fetchSuppliers()
  }

  fetchSuppliers = () => {
    _getSuppliers(this.populateSuppliers)
  }

  populateSuppliers = data => {
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
        _saveSupplier(values, this.success)
      }
    })
  }

  onDelete = id => {
    let me = this

    confirm({
      title: 'Delete Confirmation',
      content: 'Are you sure you want to delete this record?',
      onOk() {
        _deleteSupplier(id, me.deleteSuccess)
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
        description: 'Supplier has been successfully deleted',
        duration: 2,
        icon: <Icon type="smile" style={{ color: '#108ee9' }} />,
      })

      this.fetchSuppliers()
    }
  }

  success = data => {
    if (data.response === 200) {
      this.handleCancel()

      this.setState({ loading: false, record: {} })

      this.props.form.resetFields()

      notification.open({
        message: 'Success',
        description: 'Supplier has been successfully added',
        duration: 2,
        icon: <Icon type="smile" style={{ color: '#108ee9' }} />,
      })

      this.fetchSuppliers()
    }
  }

  render() {
    const columns = [
      {
        title: 'Code',
        dataIndex: 'supplier_code',
      },
      {
        title: 'Supplier',
        dataIndex: 'supplier_description',
      },
      {
        title: 'Contact Person',
        dataIndex: 'supplier_contact_person',
      },
      {
        title: 'Contact #',
        dataIndex: 'supplier_contact',
      },
      {
        title: 'Contact Email',
        dataIndex: 'supplier_email',
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
          Add New Supplier
        </Button>
        <Table columns={columns} dataSource={this.state.data} size="small" style={{ marginTop: 10 }} />

        <Modal
          visible={visible}
          title="Add New Supplier"
          onCancel={this.handleCancel}
          maskClosable={false}
          footer={[
            <Button onClick={this.handleCancel}>Cancel</Button>,
            <Button type="primary" onClick={this.formSubmit} loading={this.state.loading}>
              Save Supplier
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
              message={'Enter supplier shortname'}
              name={'supplier_code'}
              placeholder={'Enter supplier code'}
              initVal={record.supplier_code}
              label={'Supplier Code'}
            />

            <JInput
              gfd={getFieldDecorator}
              required
              message={'Please input supplier name'}
              name={'supplier_description'}
              placeholder={'Enter supplier name'}
              initVal={record.supplier_description}
              label={'Business Name'}
            />

            <JInput
              gfd={getFieldDecorator}
              required
              message={'Please input supplier contact person'}
              name={'supplier_contact_person'}
              placeholder={'Enter supplier contact person'}
              initVal={record.supplier_contact_person}
              label={'Contact Person'}
            />

            <JInput
              gfd={getFieldDecorator}
              required
              message={'Please input supplier contact'}
              name={'supplier_contact'}
              placeholder={'Enter contact'}
              initVal={record.supplier_contact}
              label={'Contact No'}
            />

            <JInput
              gfd={getFieldDecorator}
              required
              message={'Please input supplier email'}
              name={'supplier_email'}
              placeholder={'Enter supplier email'}
              initVal={record.supplier_email}
              label={'Contact Email'}
            />
          </Form>
        </Modal>
      </div>
    )
  }
}

export default Form.create({ name: 'suppliers' })(AdminSuppliersMgmt)
