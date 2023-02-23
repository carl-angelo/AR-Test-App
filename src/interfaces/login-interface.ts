export interface LoginRequestInterface {
  username: string;
  password: string;
}

export interface LoginResponseInterface {
  authCode: string;
  redirectUri: string;
}

export interface RefreshTokenRequestInterface {
  username?: string;
  refreshToken: string;
  appId: string;
  appSecret: string;
}

export interface FetchTokenRequestInterface {
  authCode: string;
  appId: string;
  appSecret: string;
}

export interface LoggedInUserDetail {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  practiceName: string;
  practiceId: string;
  clientGroupId: string;
  username: string;
  idToken: string;
  accessToken: string;
  expiresIn: 0,
  tokenType: string;
  refreshToken: string;
}