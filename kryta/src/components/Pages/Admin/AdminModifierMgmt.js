import React from 'react'
import { Table, Button, Modal, Form, Icon, Alert, notification, List, Divider, Row, Col } from 'antd'
import { _getModifiers, _saveModifier, _deleteModifier } from '../../../rest/modifiers.api'
import { JInput } from 'components'
import _ from 'lodash'
import uuidv1 from 'uuid/v1'

const confirm = Modal.confirm

class AdminModifierMgmt extends React.Component {
  state = {
    data: [],
    loading: false,
    visible: false,
    record: {},
    error: false,
    errorMessage: '',
    contentData: []
  }

  componentDidMount() {
    this.fetchModifiers()
  }

  fetchModifiers = () => {
    _getModifiers(this.populateModifiers)
  }

  populateModifiers = data => {
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

        let payload = {}

        payload.modifier_title = values.modifier_title
        payload.modifier_items = JSON.stringify(this.state.contentData)

        _saveModifier(payload, this.success)

        this.state({ contentData: [] })
      }
    })
  }

  onDelete = id => {
    let me = this

    confirm({
      title: 'Delete Confirmation',
      content: 'Are you sure you want to delete this record?',
      onOk() {
        _deleteModifier(id, me.deleteSuccess)
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
        description: 'Modifier has been successfully deleted',
        duration: 2,
        icon: <Icon type="smile" style={{ color: '#108ee9' }} />,
      })

      this.fetchModifiers()
    }
  }

  success = data => {
    if (data.response === 200) {
      this.handleCancel()

      this.setState({ loading: false, record: {} })

      this.props.form.resetFields()

      notification.open({
        message: 'Success',
        description: 'Modifier has been successfully added',
        duration: 2,
        icon: <Icon type="smile" style={{ color: '#108ee9' }} />,
      })

      this.fetchModifiers()
    }
  }

  addContent = () => {
    let contentData = this.state.contentData
    contentData.push({ id: uuidv1(), value: this.props.form.getFieldValue('modifier_content_unit'), price: this.props.form.getFieldValue('modifier_content_price') })

    this.setState({ contentData })
  }

  removeContent = (data) => {
    let contentData = _.remove(this.state.contentData, item => {
      return item.id !== data.id
    })

    this.setState({ contentData })
  }

  render() {
    const columns = [
      {
        title: 'Modifier Name',
        dataIndex: 'modifier_title',
      },
      {
        title: 'Modifier Content',
        dataIndex: 'modifier_items',
        render: (text, record) => (
          <span>
            {
              _.map(JSON.parse(record.modifier_items), rec => {
                return rec.value + '(' + rec.price + ')' + ','
              })
            }
          </span>
        ),
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
          Add New Modifier
        </Button>
        <Table columns={columns} dataSource={this.state.data} size="small" style={{ marginTop: 10 }} />

        <Modal
          visible={visible}
          title="Add New Modifier"
          onCancel={this.handleCancel}
          maskClosable={false}
          footer={[
            <Button onClick={this.handleCancel}>Cancel</Button>,
            <Button type="primary" onClick={this.formSubmit} loading={this.state.loading}>
              Save Modifier
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
              message={'Please input modifier name'}
              name={'modifier_title'}
              placeholder={'Enter modifier name'}
              initVal={record.modifier_title}
              label={'Modifier Name'}
            />

            <Divider orientation={"left"}>Modifier Contents</Divider>

            <Row>
              <Col span={12} style={{ paddingRight: 10 }}>
                <JInput
                  gfd={getFieldDecorator}
                  message={'Add modifier content'}
                  name={'modifier_content_unit'}
                  placeholder={'Add modifier content'}
                />
              </Col>
              <Col span={6} style={{ paddingRight: 10 }}>
                <JInput
                  gfd={getFieldDecorator}
                  message={'Price'}
                  name={'modifier_content_price'}
                  placeholder={'Price'}
                />
              </Col>
              <Col span={6} style={{ paddingTop: 3 }}>
                <Button icon="arrow-down" type="primary" style={{ width: '100%' }} onClick={this.addContent}>
                  Add
                </Button>
              </Col>
            </Row>

            <List
              size="small"
              bordered
              dataSource={this.state.contentData}
              renderItem={item => (
                <List.Item>
                  <Row style={{ width: '100%' }}>
                    <Col span={12}>
                      {item.value} - {item.price}
                    </Col>
                    <Col span={12} style={{ textAlign: 'right' }}>
                      <Button size={'small'} type={'danger'} onClick={() => this.removeContent(item)}>
                        <Icon type="delete" />
                      </Button>
                    </Col>
                  </Row>
                </List.Item>
              )}
            />

          </Form>
        </Modal>
      </div>
    )
  }
}

export default Form.create({ name: 'modifiers' })(AdminModifierMgmt)
