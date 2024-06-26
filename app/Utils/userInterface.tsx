export interface LoginDataInterface {
  email: string;
  password: string;
}

export interface RegistrationDataInterface {
  email: string;
  password?: string;
  first_name: string;
  last_name: string;
  dob: string;
  mobile_no: string;
  role?: string;
}

export interface ForgotPasswordDataInterface {
  email: string;
  newPassword: string;
}

export interface UpdatePasswordDataInterface {
  password: string;
  newPassword: string;
}

export interface AddAddressDataInterface {
  address_line_1: string;
  address_line_2?: string;
  city: string;
  state: string;
  country: string;
  pin_code: string;
}
