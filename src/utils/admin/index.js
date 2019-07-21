// @flow

import type { VKWebAppGetUserInfoResult } from "../../types/vk";

export const isAdmin = (user: ?VKWebAppGetUserInfoResult) => {
  const env = process.env;
  if ('REACT_APP_ADMIN_USER_ID' in env) {
    const adminId = env.REACT_APP_ADMIN_USER_ID;
    return !!user && !!adminId && user.id === parseInt(adminId)
  }
  return false
};