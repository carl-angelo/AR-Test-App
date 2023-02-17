export interface GlobalStateInterface {
  loggedInUser: LoggedInUser | null;
};

interface LoggedInUser {
  username: string;
}