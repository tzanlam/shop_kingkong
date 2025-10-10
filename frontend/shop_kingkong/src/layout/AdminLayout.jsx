import React from 'react';
import { Layout } from 'antd';
import { Outlet, useLocation } from 'react-router-dom';
import AdminSidebar from '../component/admin/AdminSidebar';
import AdminHeader from '../component/admin/AdminHeader';

const { Header, Content, Sider } = Layout;

const AdminLayout = () => {
  const location = useLocation();
  const getTitle = () => {
    switch (location.pathname) {
      case '/admin/dashboard': return 'Admin Dashboard';
      case '/admin/products': return 'Products';
      case '/admin/orders': return 'Orders';
      case '/admin/customers': return 'Customers';
      case '/admin/reviews': return 'Reviews';
      case '/admin/settings': return 'Settings';
      default: return 'Admin Dashboard';
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ padding: '0 20px', background: '#fff', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
        <AdminHeader title={getTitle()} />
      </Header>
      <Layout hasSider>
        <Sider width={250} style={{ background: '#001529', minHeight: 'calc(100vh - 64px)' }}>
          <AdminSidebar />
        </Sider>
        <Content style={{ padding: '20px', background: '#fff', minHeight: 'calc(100vh - 64px)' }}>
          <Outlet context={{ title: getTitle() }} />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;