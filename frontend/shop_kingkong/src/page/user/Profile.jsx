import React, { useEffect, useState } from "react";
import {
  Card,
  Descriptions,
  Tag,
  Spin,
  Divider,
  Avatar,
  Button,
  Tooltip,
  Switch,
  Space,
} from "antd";
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
import { HiMiniSparkles } from "react-icons/hi2";
import UpdateAccountModal from "../../component/modal/UpdateAccountModal";

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
  const [openModal, setOpenModal] = useState(false);
  const [showSystemInfo, setShowSystemInfo] = useState(false); // ⬅️ mặc định ẩn

  useEffect(() => {
    if (accountId) dispatch(FETCH_ACCOUNT(accountId));
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
        className="shadow-lg rounded-2xl"
        title={
          <div className="flex items-center gap-4">
            <Avatar size={64} style={{ backgroundColor: "#1890ff" }} icon={<UserOutlined />} />
            <div>
              <h2 className="text-xl font-bold m-0">{account.username}</h2>
              <p className="text-gray-500 m-0">Mã KH: {account.id}</p>
            </div>
          </div>
        }
        extra={
          <Space size={12}>
            <Tooltip title={showSystemInfo ? "Ẩn thông tin hệ thống" : "Hiện thông tin hệ thống"}>
              <Switch
                checkedChildren="Hệ thống"
                unCheckedChildren="Hệ thống"
                checked={showSystemInfo}
                onChange={setShowSystemInfo}
                size="small"
              />
            </Tooltip>

            <Button
              type="primary"
              size="middle"
              onClick={() => setOpenModal(true)}
              icon={<HiMiniSparkles size={18} />}
              style={{
                background: "#1677ff",
                borderColor: "#1677ff",
                borderRadius: 12,
                fontWeight: 600,
              }}
            >
              Cập nhật
            </Button>
          </Space>
        }
        bodyStyle={{ paddingTop: 12 }}
      >
        {/* Thông tin liên hệ */}
        <Divider orientation="left" plain>
          <span className="font-semibold">📞 Thông tin liên hệ</span>
        </Divider>
        <Descriptions
          bordered
          column={1}
          labelStyle={{ fontWeight: 600, width: 160 }}
          contentStyle={{ background: "#fff" }}
          className="rounded-xl overflow-hidden"
        >
          <Descriptions.Item label={<MailOutlined />}>{account.email}</Descriptions.Item>
          <Descriptions.Item label={<PhoneOutlined />}>{account.phoneNumber}</Descriptions.Item>
          <Descriptions.Item label={<EnvironmentOutlined />}>
            {account.city || "Chưa cập nhật"}
          </Descriptions.Item>
          <Descriptions.Item label={<HomeOutlined />}>
            {account.address || "Chưa cập nhật"}
          </Descriptions.Item>
        </Descriptions>

        {/* Thông tin hệ thống – có thể ẩn/hiện */}
        {showSystemInfo && (
          <>
            <Divider orientation="left" plain>
              <span className="font-semibold">⚙️ Thông tin hệ thống</span>
            </Divider>
            <Descriptions
              bordered
              column={1}
              labelStyle={{ fontWeight: 600, width: 160 }}
              className="rounded-xl overflow-hidden"
            >
              <Descriptions.Item label={<IdcardOutlined />}>
                {account.position}
              </Descriptions.Item>
              <Descriptions.Item label={<UserSwitchOutlined />}>
                <Tag color={statusColors[account.status] || "default"} style={{ fontWeight: 600 }}>
                  {account.status}
                </Tag>
              </Descriptions.Item>
            </Descriptions>
          </>
        )}
      </Card>

      <UpdateAccountModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        account={account}
      />

      {/* Tinh chỉnh nhẹ về khoảng cách/bóng đổ */}
      <style>
        {`
          .ant-card {
            border-radius: 16px;
          }
          .ant-descriptions-bordered .ant-descriptions-item-label {
            background: #fafafa;
          }
          .ant-divider-horizontal.ant-divider-with-text-left::before,
          .ant-divider-horizontal.ant-divider-with-text-left::after {
            border-top-color: #f0f0f0;
          }
        `}
      </style>
    </div>
  );
};

export default Profile;
