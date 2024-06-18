import React, { useState } from 'react'
import { Tabs, Layout } from 'antd'
import './Header.css'

const { TabPane } = Tabs
const { Header, Sider } = Layout

const AppHeader = ({ onTabChange }) => {
  const [activeTab, setActiveTab] = useState('1')

  const siderStyle = {
    textAlign: 'center',
    lineHeight: '120px',
    color: 'red',
    backgroundColor: '#FFFFFF',
    opacity: '0.5'
  }
  const handleTabChange = (key) => {
    setActiveTab(key)
    onTabChange(key)
  }
  return (
    <Layout>
      <Sider width="10%" style={siderStyle} />
      <Header
        style={{
          width: '80%',
          backgroundColor: '#fff',
          height: 'auto',

          display: 'grid',
          alignItems: 'center'
        }}
      >
        <Tabs defaultActiveKey="1" activeKey={activeTab} onChange={handleTabChange}>
          <TabPane tab="Search" key="1" />
          <TabPane tab="Rated" key="2" />
        </Tabs>
      </Header>
      <Sider width="10%" style={siderStyle} />
    </Layout>
  )
}

export default AppHeader
