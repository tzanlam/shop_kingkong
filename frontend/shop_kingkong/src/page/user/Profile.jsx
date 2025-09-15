import React, { useEffect } from "react";
import { Card, Descriptions, Tag, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  FETCH_ACCOUNT,
  selectAccount,
  selectAccountLoading,
} from "../../redux/slices/AccountSlice";

const statusColors = {
  ACTIVE: "green",
  INACTIVE: "red",
  PENDING: "orange",
  BANNED: "volcano",
};

const Profile = () => {
  const { accountId } = useSelector((state) => state.auth.accountId);
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
        title={<span className="font-bold text-xl">Hồ sơ cá nhân</span>}
        className="shadow-lg rounded-xl"
      >
        <Descriptions
          bordered
          column={1}
          labelStyle={{ fontWeight: "bold", width: "150px" }}
        >
          <Descriptions.Item label="Mã khách hàng">
            {account.id}
          </Descriptions.Item>
          <Descriptions.Item label="Tài khoản">
            {account.username}
          </Descriptions.Item>
          <Descriptions.Item label="Email">{account.email}</Descriptions.Item>
          <Descriptions.Item label="Số điện thoại">
            {account.phoneNumber}
          </Descriptions.Item>
          <Descriptions.Item label="Thành phố">
            {account.city || "Chưa cập nhật"}
          </Descriptions.Item>
          <Descriptions.Item label="Địa chỉ">
            {account.address || "Chưa cập nhật"}
          </Descriptions.Item>
          <Descriptions.Item label="Chức vụ">
            {account.position}
          </Descriptions.Item>
          <Descriptions.Item label="Trạng thái">
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
