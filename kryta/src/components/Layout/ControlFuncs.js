import React from 'react'
import { Button, Modal } from 'antd'
import { RangePicker } from 'components'
const confirm = Modal.confirm

const Confirm = (title, message, funcToCall = null) => {
  confirm({
    title: title,
    content: message,
    onOk() {
      if (funcToCall) funcToCall()
    },
    onCancel() {},
  })
}

export default {
  Confirm,
}
