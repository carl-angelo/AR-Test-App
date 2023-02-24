import { LoggedInUserDetail } from "./login-interface";

export interface GlobalStateInterface {
  auth: ContentGlobalInterface<LoggedInUserDetail>;
  error: ContentGlobalInterface<ErrorInterface>;
}

export interface ContentGlobalInterface<T> {
  content: T | null;
}

export interface ErrorInterface {
  code: number;
  data: any;
}