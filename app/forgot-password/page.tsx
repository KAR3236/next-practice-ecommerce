"use client";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Paper,
  TextField,
} from "@mui/material";
import { Form } from "../Components/Form";
import { toast } from "react-toastify";
import Link from "next/link";
import { useFormik } from "formik";
import { forgotPasswordValidation } from "../Validations/userValidation";
import { useDispatch, useSelector } from "react-redux";
import { hideLoader, showLoader } from "../Redux/Slice/loaderSlice";
import { forgotPasswordAPI } from "../APIs/userAPIs";
import { constant } from "../Utils/constants";

const ForgotPassword = () => {
  const navigate = useRouter();

  //Redux
  const dispatch = useDispatch();
  const { loader } = useSelector((state: any) => state?.loader);

  // Formik for validation and handle event by user
  const formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema: forgotPasswordValidation,
    onSubmit: (values) => {
      dispatch(showLoader());
      forgotPasswordAPI(values)
        .then((registerData: any) => {
          if (registerData?.data?.statusCode === 202) {
            toast.success(registerData?.data?.message);
            navigate.push("/");
          } else {
            toast.error(registerData?.data?.message);
          }
        })
        .catch((error: any) => {
          if (error.response?.data?.statusCode === 400) {
            toast.error(error?.response?.data?.message[0]);
          } else {
            toast.error(error?.response?.data?.message);
          }
        })
        .finally(() => {
          dispatch(hideLoader());
        });
    },
  });

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
      }}
    >
      <Paper
        sx={{
          p: 2,
          margin: "auto",
          maxWidth: 500,
          flexGrow: 1,
        }}
      >
        <Grid container justifyContent="center" alignItems="center">
          <Form onSubmit={formik.handleSubmit}>
            <Grid item xs={12}>
              <h1 style={{ padding: 20, textAlign: "center", fontSize: 25 }}>
                {constant.FORGOT_PASSWORD}
              </h1>
            </Grid>

            <Grid item xs={12}>
              <TextField
                id={constant.EMAIL}
                label={constant.EMAIL}
                type={constant.EMAIL.toLowerCase()}
                name={constant.EMAIL.toLowerCase()}
                placeholder="name@example.com"
                style={{ padding: 10 }}
                value={formik?.values?.email}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik?.touched?.email && formik?.errors?.email ? (
                <div
                  style={{ color: "red", paddingLeft: 10, paddingBottom: 10 }}
                >
                  {formik?.errors?.email}
                </div>
              ) : null}
            </Grid>

            <Grid item xs={12}>
              <TextField
                id={constant.NEW_PASSWORD}
                type={constant.PASSWORD.toLowerCase()}
                label={constant.NEW_PASSWORD}
                name="newPassword"
                placeholder="Enter new password"
                style={{ padding: 10 }}
                value={formik?.values?.newPassword}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik?.touched?.newPassword && formik?.errors?.newPassword ? (
                <div
                  style={{ color: "red", paddingLeft: 10, paddingBottom: 10 }}
                >
                  {formik?.errors?.newPassword}
                </div>
              ) : null}
            </Grid>

            <Grid item xs={12} style={{ textAlign: "center" }}>
              <Button
                type="submit"
                variant="contained"
                style={{ color: "black", backgroundColor: "white" }}
              >
                {loader ? <CircularProgress size={25} /> : constant.SUBMIT}
              </Button>
            </Grid>
            <hr className="my-4"></hr>

            <Grid item xs={12} style={{ textAlign: "center" }}>
              <Link
                className="bg-gray-500 hover:bg-gray-700"
                style={{ padding: 8, color: "white" }}
                href="/"
              >
                {constant.LOGIN}
              </Link>
            </Grid>
          </Form>
        </Grid>
      </Paper>
    </Box>
  );
};

export default ForgotPassword;
