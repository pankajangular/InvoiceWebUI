export class User {
  id: number;
  name: string;
  password: string;
  oldPassword: string;
  newpassword: string;
  confirmnewpassword: string;
  email: string;
  phone: string;
  token?: string;
}
