import { LoggedInUserDetail } from "./login-interface";

export interface GlobalStateInterface {
  auth: LoggedInUserDetail | null;
}