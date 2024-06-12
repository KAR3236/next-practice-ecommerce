import {
  ForgotPasswordDataInterface,
  LoginDataInterface,
  RegistrationDataInterface,
  UpdatePasswordDataInterface,
} from "../Utils/userInterface";
import {
  EDIT_PROFILE_API,
  FORGOT_PASSWORD_API,
  LOGIN_API,
  REGISTRATION_API,
  UPDATE_PASSWORD_API,
  VIEW_PROFILE_API,
} from "./APIs";
import { baseURL } from "./baseUrl";
import Cookies from "js-cookie";

const loginToken = Cookies.get("loginToken");

export async function loginAPI(data: LoginDataInterface) {
  return await baseURL.post(LOGIN_API, data);
}

export async function registrationAPI(data: RegistrationDataInterface) {
  return await baseURL.post(REGISTRATION_API, data);
}

export async function forgotPasswordAPI(data: ForgotPasswordDataInterface) {
  return await baseURL.put(FORGOT_PASSWORD_API, data);
}

export async function viewProfileAPI() {
  return await baseURL.get(VIEW_PROFILE_API, {
    headers: {
      Authorization: `Bearer ${loginToken}`,
    },
  });
}

export async function editProfileAPI(data: RegistrationDataInterface) {
  return await baseURL.put(EDIT_PROFILE_API, data, {
    headers: {
      Authorization: `Bearer ${loginToken}`,
    },
  });
}

export async function updatePasswordAPI(data: UpdatePasswordDataInterface) {
  return await baseURL.put(UPDATE_PASSWORD_API, data, {
    headers: {
      Authorization: `Bearer ${loginToken}`,
    },
  });
}
