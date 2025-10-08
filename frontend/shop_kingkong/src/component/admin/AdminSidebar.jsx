import React from 'react';
import { Menu } from 'antd';
import { HomeOutlined, BoxPlotOutlined, ShoppingCartOutlined, UserOutlined, StarOutlined, SettingOutlined } from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';

const AdminSidebar = () => {
  const location = useLocation();

  const menuItems = [
    { key: '/dashboard', icon: <HomeOutlined />, label: <Link to="/dashboard">Dashboard</Link> },
    { key: '/products', icon: <BoxPlotOutlined />, label: <Link to="/products">Products</Link> },
    { key: '/orders', icon: <ShoppingCartOutlined />, label: <Link to="/orders">Orders</Link> },
    { key: '/customers', icon: <UserOutlined />, label: <Link to="/customers">Customers</Link> },
    { key: '/reviews', icon: <StarOutlined />, label: <Link to="/reviews">Reviews</Link> },
    { key: '/settings', icon: <SettingOutlined />, label: <Link to="/settings">Settings</Link> },
  ];

  return (
    <div className="h-screen bg-gradient-to-b from-gray-800 to-gray-900 text-white p-6">
      <h2 className="text-2xl font-bold mb-6">KINGKONG</h2>
      <Menu
        mode="inline"
        defaultSelectedKeys={[location.pathname]}
        style={{ background: 'transparent', border: 'none', color: '#fff' }}
        items={menuItems}
      />
    </div>
  );
};

export default AdminSidebar;