export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: Date;
  phone: string;
  fcmToken?: any;
  imageProfil?: any;
  created_at: Date;
  updated_at: Date;
}

export interface Data {
  user: User;
}

export interface UserInterface {
  success: boolean;
  data: Data;
  message: string;
}
