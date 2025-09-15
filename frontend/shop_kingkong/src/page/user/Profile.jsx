import React, { useEffect } from "react";
import { Card, Descriptions, Tag, Spin, Divider, Avatar } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  FETCH_ACCOUNT,
  selectAccount,
  selectAccountLoading,
} from "../../redux/slices/AccountSlice";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  HomeOutlined,
  EnvironmentOutlined,
  IdcardOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";

const statusColors = {
  ACTIVE: "green",
  INACTIVE: "red",
  PENDING: "orange",
  BANNED: "volcano",
};

const Profile = () => {
  const accountId = useSelector((state) => state.auth.accountId);
  const dispatch = useDispatch();

  const account = useSelector(selectAccount);
  const loading = useSelector(selectAccountLoading);

  useEffect(() => {
    if (accountId) {
      dispatch(FETCH_ACCOUNT(accountId));
    }
  }, [accountId, dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" />
      </div>
    );
  }

  if (!account) {
    return (
      <div className="text-center text-gray-500 py-10">
        Không tìm thấy thông tin tài khoản
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-10">
      <Card
        className="shadow-lg rounded-xl"
        title={
          <div className="flex items-center space-x-4">
            <Avatar
              size={64}
              style={{ backgroundColor: "#1890ff" }}
              icon={<UserOutlined />}
            />
            <div>
              <h2 className="text-xl font-bold m-0">{account.username}</h2>
              <p className="text-gray-500 m-0">Mã KH: {account.id}</p>
            </div>
          </div>
        }
      >
        {/* Thông tin liên hệ */}
        <Divider orientation="left">📞 Thông tin liên hệ</Divider>
        <Descriptions bordered column={1} labelStyle={{ fontWeight: "bold" }}>
          <Descriptions.Item label={<MailOutlined />}>
            {account.email}
          </Descriptions.Item>
          <Descriptions.Item label={<PhoneOutlined />}>
            {account.phoneNumber}
          </Descriptions.Item>
          <Descriptions.Item label={<EnvironmentOutlined />}>
            {account.city || "Chưa cập nhật"}
          </Descriptions.Item>
          <Descriptions.Item label={<HomeOutlined />}>
            {account.address || "Chưa cập nhật"}
          </Descriptions.Item>
        </Descriptions>

        {/* Thông tin hệ thống */}
        <Divider orientation="left">⚙️ Thông tin hệ thống</Divider>
        <Descriptions bordered column={1} labelStyle={{ fontWeight: "bold" }}>
          <Descriptions.Item label={<IdcardOutlined />}>
            {account.position}
          </Descriptions.Item>
          <Descriptions.Item label={<UserSwitchOutlined />}>
            <Tag color={statusColors[account.status] || "default"}>
              {account.status}
            </Tag>
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
};

export default Profile;
