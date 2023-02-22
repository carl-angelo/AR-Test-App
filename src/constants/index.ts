import { ENV } from "./environment";

const baseAPI = ENV.BASE_API;
const appId = ENV.APP_ID;
const appSecret = ENV.APP_SECRET;
const authUser = 'AUTH_USER';
const authTokenKey = 'AUTH_TOKEN';
const authAccess = 'AUTH_ACCESS';

export {
  baseAPI,
  appId,
  appSecret,
  authUser,
  authAccess,
  authTokenKey
};