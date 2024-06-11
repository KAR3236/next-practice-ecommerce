import { ForgotPasswordDataInterface, LoginDataInterface, RegistrationDataInterface } from "../Utils/userInterface";
import { FORGOT_PASSWORD_API, LOGIN_API, REGISTRATION_API } from "./APIs";
import { baseURL } from "./baseUrl";

export async function loginAPI(data: LoginDataInterface) {
  return await baseURL.post(LOGIN_API, data);
}

export async function registrationAPI(data: RegistrationDataInterface) {
  return await baseURL.post(REGISTRATION_API, data);
}

export async function forgotPasswordAPI(data: ForgotPasswordDataInterface) {
  return await baseURL.put(FORGOT_PASSWORD_API, data);
}
