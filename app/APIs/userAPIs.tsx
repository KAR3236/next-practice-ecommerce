import {
  AddAddressDataInterface,
  ForgotPasswordDataInterface,
  LoginDataInterface,
  RegistrationDataInterface,
  UpdatePasswordDataInterface,
} from "../Utils/userInterface";
import {
  ADD_ADDRESS_API,
  DELETE_ADDRESS_API,
  EDIT_PROFILE_API,
  FORGOT_PASSWORD_API,
  LIST_OF_ADDRESSES_API,
  LOGIN_API,
  REGISTRATION_API,
  UPDATE_ADDRESS_API,
  UPDATE_PASSWORD_API,
  VIEW_ADDRESS_API,
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

export async function listOfUserAddressesAPI() {
  return await baseURL.get(LIST_OF_ADDRESSES_API, {
    headers: {
      Authorization: `Bearer ${loginToken}`,
    },
  });
}

export async function addAddressAPI(data: AddAddressDataInterface) {
  return await baseURL.post(ADD_ADDRESS_API, data, {
    headers: {
      Authorization: `Bearer ${loginToken}`,
    },
  });
}

export async function viewAddressAPI(id: string) {
  return await baseURL.get(`${VIEW_ADDRESS_API}/${id}`, {
    headers: {
      Authorization: `Bearer ${loginToken}`,
    },
  });
}

export async function updateAddressAPI(id: string, data: AddAddressDataInterface) {
  return await baseURL.put(`${UPDATE_ADDRESS_API}/${id}`, data, {
    headers: {
      Authorization: `Bearer ${loginToken}`,
    },
  });
}

export async function deleteAddressAPI(id: number) {
  return await baseURL.delete(`${DELETE_ADDRESS_API}/${id}`, {
    headers: {
      Authorization: `Bearer ${loginToken}`,
    },
  });
}
