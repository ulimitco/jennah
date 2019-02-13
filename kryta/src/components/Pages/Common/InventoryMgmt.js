import React from 'react'
import { Table, Button, Modal, Form, Icon, Alert, notification, Row, Col, Divider, Input } from 'antd'
import { _getInventories, _saveInventory, _saveInventories, _deleteInventory } from '../../../rest/inventories.api'
import { _getBranches } from '../../../rest/branches.api'
import { _getItems } from '../../../rest/items.api'

import { JInput } from 'components'
import _ from 'lodash'

const confirm = Modal.confirm

class InventoryMgmt extends React.Component {
  state = {
    data: [],
    branches: [],
    items: [],
    loading: false,
    visible: false,
    record: {},
    error: false,
    errorMessage: '',
  }

  componentDidMount() {
    this.fetchInventories()
  }

  fetchInventories = () => {
    _getInventories(this.populateInventories)
  }

  fetchBranches = () => {
    _getBranches(this.populateBranches)
  }

  fetchItems = () => {
    _getItems(this.populateItems)
  }

  populateInventories = data => {
    this.setState({ data })
  }

  populateBranches = data => {
    this.setState({ branches: data })
  }

  populateItems = data => {
    this.setState({ items: data })
  }

  showModal = () => {

    this.fetchBranches()
    this.fetchItems()

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

        let content = []

        if(!_.isEmpty(values.data)){
          _.map(values.data, (val, key) => {
            if(!_.isEmpty(key) || !_.isEmpty(val))
              content.push({ id: key, value: val })
          })
        }

        let newPayload = {
          branch_from: values.branch_from,
          branch_to: values.branch_to,
          data: content
        }

        _saveInventories(newPayload, this.success)
      }
    })
  }

  onDelete = id => {
    let me = this

    confirm({
      title: 'Delete Confirmation',
      content: 'Are you sure you want to delete this record?',
      onOk() {
        _deleteInventory(id, me.deleteSuccess)
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
      inventory_id: record.description,
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

      this.fetchInventories()
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

      this.fetchInventories()
    }
  }

  render() {
    const columns = [
      {
        title: 'Type',
        dataIndex: 'inventory_type',
        width: 100,
      },
      {
        title: 'Item',
        dataIndex: 'item',
      },
      {
        title: 'Units/Pkg',
        dataIndex: 'uom',
        render: (text, record) => {
          if(record.packaging === record.uom){
            return <span>{record.package_qty}{record.uom}</span>
          } else {
            return <span>{record.package_qty}{record.uom}/{record.packaging}</span>
          }
        }
      },
      {
        title: 'IN',
        dataIndex: 'qty_in',
        width: 80,
      },
      {
        title: 'OUT',
        dataIndex: 'qty_out',
        width: 80,
      },
      {
        title: 'Cost',
        dataIndex: 'unit_cost',
        width: 110,
      },
      {
        title: 'SRP',
        dataIndex: 'srp',
        width: 110,
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span>
            <Button size={'small'} onClick={() => this.onEdit(record)}>
              <Icon type="edit" />
            </Button>
            <Button size={'small'} type={'danger'} style={{ marginLeft: 3 }} onClick={() => this.onDelete(record.inv_id)}>
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
          Add Stock
        </Button>

        <Table columns={columns} dataSource={this.state.data} size="small" style={{ marginTop: 10 }} />

        <Modal
          visible={visible}
          title="Add Stock"
          onCancel={this.handleCancel}
          maskClosable={false}
          footer={[
            <Button onClick={this.handleCancel}>Cancel</Button>,
            <Button type="primary" onClick={this.formSubmit} loading={this.state.loading}>
              Save Record
            </Button>,
          ]}
        >
        
          {this.state.error ? (
            <Alert style={{ marginBottom: 16 }} type={'warning'} message={this.state.errorMessage} showIcon />
          ) : null}

          <Form>
          <Row>
            <Col span={12}>
              <JInput
                gfd={getFieldDecorator}
                required
                message={'Please select a branch'}
                name={'branch_from'}
                fieldname={'name'}
                fieldvalue={'id'}
                placeholder={'Stocks source'}
                initVal={record.name || undefined}
                options={this.state.branches}
                type={'select'}
                label={'From'}
                labelAlign={'center'}
              />
            </Col>
            <Col span={12}>
              <JInput
                gfd={getFieldDecorator}
                required
                message={'Please select a branch'}
                name={'branch_to'}
                fieldname={'name'}
                fieldvalue={'id'}
                placeholder={'Transfer to'}
                initVal={record.name || undefined}
                options={this.state.branches}
                type={'select'}
                label={'To'}
                labelAlign={'center'}
              />
            </Col>
          </Row>
          

          <Divider orientation="left">Items to transfer</Divider>
          {
            _.map(this.state.items, item => {
              return (
                <Row>
                  <Col span={12}>
                    <span>{item.item}</span>
                  </Col>
                  <Col span={12}>
                  <JInput
                    gfd={getFieldDecorator}
                    message={'Enter item name'}
                    name={'data.' + item.item_id}
                    placeholder={'Quantity'}
                  />
                  </Col>
                </Row>
              )
            })
          }
          </Form>
          
        </Modal>
      </div>
    )
  }
}

export default Form.create({ name: 'inventory' })(InventoryMgmt)
