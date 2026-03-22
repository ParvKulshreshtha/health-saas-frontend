export interface AuthUser {
  uid: string;
  email: string | null;
}

export interface LoginFormValues {
  email: string;
  password: string;
}

export interface AuthError {
  code: string;
  message: string;
}