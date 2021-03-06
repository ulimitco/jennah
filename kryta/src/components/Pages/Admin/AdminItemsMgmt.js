import React from 'react'
import { Table, Button, Modal, Form, Icon, Alert, notification } from 'antd'
import { _getItems, _saveItem, _deleteItem } from '../../../rest/items.api'
import { _getCategories } from '../../../rest/categories.api'
import numeral from 'numeral'


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
    selectedRecord: {}
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
        let payload = _.clone(values)

        // item: record.item,
        // description: record.description,
        // barcode: record.barcode,
        // category_id: record.category_id,
        // brand: record.brand,
        // default_unit_cost: record.default_unit_cost,
        // default_srp: record.default_srp,
        // uom: record.uom

        // item.MarkupPercent,
        // item.MarkupAmount,
        // item.StockNotifyLimit,
        // item.StockLimit)

        if(!_.isEmpty(this.state.selectedRecord))
          payload.id = this.state.selectedRecord.item_id

        _saveItem(payload, this.success)
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

    console.log(record)
    
    setTimeout(() => {
      this.props.form.setFieldsValue({
        item: record.item,
        description: record.description,
        barcode: record.barcode,
        category_id: record.category_id,
        brand: record.brand,
        default_unit_cost: record.default_unit_cost,
        default_srp: record.default_srp,
        uom: record.uom
      })
    }, 500)

    this.setState({ visible: true, selectedRecord: record })
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
        dataIndex: 'code',
        width: 110,
      },
      {
        title: 'Item',
        dataIndex: 'item',
        render: (text, record) => (
          <span>{record.item}</span>
        )
      },
      {
        title: 'Cost',
        dataIndex: 'default_unit_cost',
        render: (text, record) => {
          return numeral(record.default_unit_cost).format('0,0.00')
        }
      },
      {
        title: 'SRP',
        dataIndex: 'default_srp',
        render: (text, record) => {
          return numeral(record.default_srp).format('0,0.00')
        }
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <div>
            <Button size={'small'} onClick={() => this.onEdit(record)}>
              <Icon type="edit" />
            </Button>
            <Button size={'small'} type={'danger'} style={{ marginLeft: 3 }} onClick={() => this.onDelete(record.item_id)}>
              <Icon type="delete" />
            </Button>
          </div>
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
              fieldname={'category_description'}
              fieldvalue={'id'}
              placeholder={'Select category for item'}
              initVal={record.category_description || undefined}
              options={this.state.categories}
              type={'select'}
              label={'Category'}
            />

            <JInput
              gfd={getFieldDecorator}
              message={'Please input brand'}
              name={'brand'}
              placeholder={'Enter brand'}
              initVal={record.brand}
              label={'Brand'}
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
              initVal={record.item}
              label={'Item Name'}
            />

            <JInput
              gfd={getFieldDecorator}
              message={'Please input description'}
              name={'description'}
              placeholder={'Enter description'}
              initVal={record.description}
              label={'Description'}
            />

            <JInput
              gfd={getFieldDecorator}
              required
              message={'Please input unit of measure'}
              name={'uom'}
              placeholder={'Enter unit of measure'}
              initVal={record.uom}
              label={'UOM'}
            />

            <JInput
              gfd={getFieldDecorator}
              message={'Please input default unit cost'}
              name={'default_unit_cost'}
              placeholder={'Enter default unit cost'}
              initVal={record.default_unit_cost}
              label={'Default Cost'}
            />

            <JInput
              gfd={getFieldDecorator}
              required
              message={'Please input default srp'}
              name={'default_srp'}
              placeholder={'Enter default srp'}
              initVal={record.default_srp}
              label={'Default SRP'}
            />

          </Form>
        </Modal>
      </div>
    )
  }
}

export default Form.create({ name: 'items' })(AdminItemsMgmt)
