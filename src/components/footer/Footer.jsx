import React from 'react'
import { Layout, Pagination } from 'antd'

const { Sider, Footer } = Layout

const AppFooter = ({ totalPages, onPageChange, currentPage }) => {
  const siderStyle = {
    textAlign: 'center',
    lineHeight: '120px',
    color: 'red',
    backgroundColor: '#FFFFFF',
    opacity: '0.5'
  }
  return (
    <Layout>
      <Sider width="10%" style={siderStyle} />
      <Footer
        style={{
          width: '80%',
          backgroundColor: '#fff',
          height: 'auto',
          display: 'grid',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Pagination
          current={currentPage}
          total={totalPages * 10} // Общее количество элементов (totalPages * количество элементов на страницу)
          onChange={onPageChange}
        />
      </Footer>
      <Sider width="10%" style={siderStyle} />
    </Layout>
  )
}

export default AppFooter
