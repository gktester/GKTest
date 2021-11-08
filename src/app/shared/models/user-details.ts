export interface CurrentUser {
    id: number;
    username?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    token: string;
}
export interface Credentials {
  username: string;
  password: string;
}
