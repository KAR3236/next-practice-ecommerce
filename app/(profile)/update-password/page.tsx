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
import { toast } from "react-toastify";
import Link from "next/link";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "@/app/Components/Form";
import { updatePasswordValidation } from "@/app/Validations/userValidation";
import { hideLoader, showLoader } from "@/app/Redux/Slice/loaderSlice";
import { updatePasswordAPI } from "@/app/APIs/userAPIs";
import { constant } from "@/app/Utils/constants";

const ForgotPassword = () => {
  const navigate = useRouter();

  //Redux
  const dispatch = useDispatch();
  const { loader } = useSelector((state: any) => state?.loader);

  // Formik for validation and handle event by user
  const formik = useFormik({
    initialValues: {
      password: "",
      newPassword: "",
    },
    validationSchema: updatePasswordValidation,
    onSubmit: (values) => {
      dispatch(showLoader());
      updatePasswordAPI(values)
        .then((updatePasswordData: any) => {
          if (updatePasswordData?.data?.statusCode === 202) {
            toast.success(updatePasswordData?.data?.message);
            navigate.push("/view-profile");
          } else {
            toast.error(updatePasswordData?.data?.message);
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
                {constant.UPDATE_PASSWORD}
              </h1>
            </Grid>

            <Grid item xs={12}>
              <TextField
                id={constant.PASSWORD}
                label={constant.PASSWORD}
                type={constant.PASSWORD.toLowerCase()}
                name={constant.PASSWORD.toLowerCase()}
                placeholder="Enter old password"
                style={{ padding: 10 }}
                value={formik?.values?.password}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik?.touched?.password && formik?.errors?.password ? (
                <div
                  style={{ color: "red", paddingLeft: 10, paddingBottom: 10 }}
                >
                  {formik?.errors?.password}
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
                {loader ? <CircularProgress size={25} /> : constant.UPDATE}
              </Button>
            </Grid>
            <hr className="my-4"></hr>

            <Grid item xs={12} style={{ textAlign: "center" }}>
              <Link
                className="bg-gray-500 hover:bg-gray-700"
                style={{ padding: 8, color: "white" }}
                href="/view-profile"
              >
                {constant.BACK}
              </Link>
            </Grid>
          </Form>
        </Grid>
      </Paper>
    </Box>
  );
};

export default ForgotPassword;
