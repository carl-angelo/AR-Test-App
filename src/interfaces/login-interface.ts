export interface LoginRequestInterface {
  username: string;
  password: string;
};

export interface LoginResponseInterface {
  authCode: string;
  redirectUri: string;
}