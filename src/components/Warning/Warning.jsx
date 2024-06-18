import React from 'react'
import { Alert, Space } from 'antd'
import './Warning.css'
const Warning = ({ message, type }) => (
  <Space direction="vertical" style={{ width: '100%' }}>
    {type === 'info' && <Alert message="Try to search again." description={message} type="info" showIcon closable />}
    {type === 'error' && (
      <Alert
        style={{ position: 'fixed', bottom: '10%' }}
        message="Error"
        description={message}
        type="error"
        showIcon
        closable
      />
    )}
  </Space>
)

export default Warning
