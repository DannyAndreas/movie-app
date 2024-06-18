import React from 'react'
import { Layout } from 'antd'

const { Sider, Content } = Layout
const MyLayout = ({ siderStyle, contentStyle, children }) => {
  return (
    <Layout style={{ overflow: 'hidden' }}>
      <Layout>
        <Sider width="10%" style={siderStyle} />

        <Content width="80%" style={contentStyle}>
          {children}
        </Content>
        <Sider width="10%" style={siderStyle} />
      </Layout>
    </Layout>
  )
}

export default MyLayout
