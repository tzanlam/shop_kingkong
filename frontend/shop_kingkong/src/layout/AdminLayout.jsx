import React from 'react';
import { Layout } from 'antd';
import { Outlet, useLocation } from 'react-router-dom';
import AdminSidebar from '../component/admin/AdminSidebar';
import AdminHeader from '../component/admin/AdminHeader';

const { Content } = Layout;

const AdminLayout = () => {
  const location = useLocation();
  const getTitle = () => {
    switch (location.pathname) {
      case '/dashboard': return 'Admin Dashboard';
      case '/products': return 'Products';
      case '/orders': return 'Orders';
      case '/customers': return 'Customers';
      case '/reviews': return 'Reviews';
      case '/settings': return 'Settings';
      default: return 'Admin Dashboard';
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <AdminSidebar />
      <Layout>
        <AdminHeader title={getTitle()} />
        <Content style={{ margin: '20px', padding: '20px', background: '#fff', borderRadius: '8px' }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;