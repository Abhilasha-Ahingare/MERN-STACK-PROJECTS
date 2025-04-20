import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { UserAuth } from "../../store/auth";

const LogOutPage = () => {
  const { LogOutUser } = UserAuth();

  useEffect(() => {
    LogOutUser();
  }, [LogOutUser]);
  return <Navigate to={"/login"} />;
};

export default LogOutPage;
