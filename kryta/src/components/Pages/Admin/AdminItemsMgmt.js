import React from 'react'
import { Table, Button, Modal, Form, Icon, Alert, notification } from 'antd'
import { _getItems, _saveItem, _deleteItem } from '../../../rest/items.api'
import { _getCategories } from '../../../rest/categories.api'

import { JInput } from 'components'
import _ from 'lodash'

const confirm = Modal.confirm

class AdminItemsMgmt extends React.Component {
  state = {
    data: [],
    categories: [],
    loading: false,
    visible: false,
    record: {},
    error: false,
    errorMessage: '',
  }

  componentDidMount() {
    this.fetchItems()
    this.fetchCategories()
  }

  fetchItems = () => {
    _getItems(this.populateItems)
  }

  populateItems = data => {
    this.setState({ data })
  }

  fetchCategories = () => {
    _getCategories(this.populateCategories)
  }

  populateCategories = data => {
    this.setState({ categories: data })
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
        _saveItem(values, this.success)
      }
    })
  }

  onDelete = id => {
    let me = this

    confirm({
      title: 'Delete Confirmation',
      content: 'Are you sure you want to delete this record?',
      onOk() {
        _deleteItem(id, me.deleteSuccess)
      },
      onCancel() {},
    })
  }

  onEdit = record => {
    this.props.form.setFieldsValue({
      item: record.item,
      description: record.description,
      stock_code: record.stock_code,
      barcode: record.barcode,
      category_id: record.description,
    })

    this.setState({ visible: true }, () => console.log(this.state.record))
  }

  deleteSuccess = data => {
    if (data.response === 200) {
      notification.open({
        message: 'Done',
        description: 'Item has been successfully deleted',
        duration: 2,
        icon: <Icon type="smile" style={{ color: '#108ee9' }} />,
      })

      this.fetchItems()
    }
  }

  success = data => {
    if (data.response === 200) {
      this.handleCancel()

      this.setState({ loading: false, record: {} })

      this.props.form.resetFields()

      notification.open({
        message: 'Success',
        description: 'Item has been successfully added',
        duration: 2,
        icon: <Icon type="smile" style={{ color: '#108ee9' }} />,
      })

      this.fetchItems()
    }
  }

  render() {
    const columns = [
      {
        title: 'Category',
        dataIndex: 'category_code',
      },
      {
        title: 'Stock Code',
        dataIndex: 'stock_code',
        width: 100,
      },
      {
        title: 'Barcode',
        dataIndex: 'barcode',
        width: 100,
      },
      {
        title: 'Item',
        dataIndex: 'item',
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
          Add New Item
        </Button>
        <Table columns={columns} dataSource={this.state.data} size="small" style={{ marginTop: 10 }} />

        <Modal
          visible={visible}
          title="Add New Item"
          onCancel={this.handleCancel}
          maskClosable={false}
          footer={[
            <Button onClick={this.handleCancel}>Cancel</Button>,
            <Button type="primary" onClick={this.formSubmit} loading={this.state.loading}>
              Save Item
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
              message={'Please select a category'}
              name={'category_id'}
              fieldname={'description'}
              fieldvalue={'id'}
              placeholder={'Select category for item'}
              initVal={record.description || undefined}
              options={this.state.categories}
              type={'select'}
              label={'Category'}
            />

            <JInput
              gfd={getFieldDecorator}
              required
              message={'Please input stock code'}
              name={'stock_code'}
              placeholder={'Enter stock code'}
              initVal={record.stock_code}
              label={'Stock Code'}
            />

            <JInput
              gfd={getFieldDecorator}
              required
              message={'Please input barcode'}
              name={'barcode'}
              placeholder={'Enter barcode'}
              initVal={record.barcode}
              label={'Barcode'}
            />

            <JInput
              gfd={getFieldDecorator}
              required
              message={'Enter item name'}
              name={'item'}
              placeholder={'Enter item name'}
              initVal={record.code}
              label={'Item Name'}
            />

            <JInput
              gfd={getFieldDecorator}
              required
              message={'Please input description'}
              name={'description'}
              placeholder={'Enter description'}
              initVal={record.description}
              label={'Description'}
            />
          </Form>
        </Modal>
      </div>
    )
  }
}

export default Form.create({ name: 'items' })(AdminItemsMgmt)
