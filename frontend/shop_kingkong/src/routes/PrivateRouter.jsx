import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAccessToken, selectAccountId } from '../redux/slices/AuthSlice';

const PrivateRoute = ({ requiredPosition }) => {
  const accessToken = useSelector(selectAccessToken);
  const accountId = useSelector(selectAccountId);
  const position = useSelector((state) => state.auth.position);

  if (!accessToken || !accountId) {
    return <Navigate to="/login" />;
  }

  if (requiredPosition && position !== requiredPosition) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default PrivateRoute;