import { Dropdown, Space, Menu } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';

const AdminHeader = ({ title }) => {
  const userMenu = (
    <Menu>
      <Menu.Item key="profile" icon={<UserOutlined />}>
        Hồ sơ cá nhân
      </Menu.Item>
      <Menu.Item key="logout" icon={<LogoutOutlined />}>
        Đăng xuất
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="bg-white p-4 shadow-md flex justify-between items-center">
      <h2 className="text-xl font-semibold">{title}</h2>
      <Dropdown menu={userMenu} placement="bottomRight">
        <Space className="cursor-pointer">
          John Doe
          <UserOutlined />
        </Space>
      </Dropdown>
    </div>
  );
};

export default AdminHeader;