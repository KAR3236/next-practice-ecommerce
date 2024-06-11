import * as Yup from "yup";
import { constant } from "../Utils/constants";

export const loginValidation = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string()
    .min(8)
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      "Password must contain at least 8 characters, one lowercase letter, one uppercase letter, one number, and one special character"
    )
    .required(),
});

export const registrationValidation = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string()
    .min(8)
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      "Password must contain at least 8 characters, one lowercase letter, one uppercase letter, one number, and one special character"
    )
    .required(),
  first_name: Yup.string().required(),
  last_name: Yup.string().required(),
  mobile_no: Yup.string().min(10).required(),
  dob: Yup.string().required(),
  role: Yup.string()
    .oneOf([constant.ADMIN, constant.CUSTOMER, constant.VENDOR])
    .required(),
});

export const forgotPasswordValidation = Yup.object({
  email: Yup.string().email().required(),
  newPassword: Yup.string()
    .min(8)
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      "Password must contain at least 8 characters, one lowercase letter, one uppercase letter, one number, and one special character"
    )
    .required(),
});
