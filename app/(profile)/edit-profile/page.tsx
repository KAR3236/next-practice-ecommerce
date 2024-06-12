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
import { editProfileValidation } from "@/app/Validations/userValidation";
import { hideLoader, showLoader } from "@/app/Redux/Slice/loaderSlice";
import { editProfileAPI, viewProfileAPI } from "@/app/APIs/userAPIs";
import { constant } from "@/app/Utils/constants";
import { useEffect } from "react";

const EditProfile = () => {
  const navigate = useRouter();

  //Redux
  const dispatch = useDispatch();
  const { loader } = useSelector((state: any) => state?.loader);

  useEffect(() => {
    dispatch(showLoader());
    viewProfileAPI()
      .then((viewProfileData: any) => {
        if (viewProfileData?.data?.statusCode === 200) {
          dispatch(hideLoader());
          formik.setValues(viewProfileData?.data?.data);
        }
      })
      .catch((error: any) => {
        toast.error(error?.response?.data?.message);
      })
      .finally(() => {
        dispatch(hideLoader());
      });
  }, []);

  // Formik for validation and handle event by user
  const formik = useFormik({
    initialValues: {
      email: "",
      first_name: "",
      last_name: "",
      mobile_no: "",
      dob: "",
    },
    validationSchema: editProfileValidation,
    onSubmit: (values) => {
      dispatch(showLoader());
      editProfileAPI(values)
        .then((editProfileData: any) => {
          if (editProfileData?.data?.statusCode === 202) {
            toast.success(editProfileData?.data?.message);
            navigate.push("/view-profile");
          } else {
            toast.error(editProfileData?.data?.message);
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
        height: "100vh",
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
                {constant.EDIT_PROFILE}
              </h1>
            </Grid>

            <Grid item xs={12}>
              <TextField
                id={constant.EMAIL}
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
                id={constant.FIRST_NAME}
                name="first_name"
                type="text"
                placeholder="Enter your first name"
                style={{ padding: 10 }}
                value={formik?.values?.first_name}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik?.touched?.first_name && formik?.errors?.first_name ? (
                <div
                  style={{ color: "red", paddingLeft: 10, paddingBottom: 10 }}
                >
                  {formik?.errors?.first_name}
                </div>
              ) : null}
            </Grid>

            <Grid item xs={12}>
              <TextField
                id={constant.LAST_NAME}
                name="last_name"
                type="text"
                placeholder="Enter your last name"
                style={{ padding: 10 }}
                value={formik?.values?.last_name}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik?.touched?.last_name && formik?.errors?.last_name ? (
                <div
                  style={{ color: "red", paddingLeft: 10, paddingBottom: 10 }}
                >
                  {formik?.errors?.last_name}
                </div>
              ) : null}
            </Grid>

            <Grid item xs={12}>
              <TextField
                id={constant.MOBILE_NO}
                name="mobile_no"
                type="text"
                placeholder="Enter your Mobile No"
                style={{ padding: 10 }}
                value={formik?.values?.mobile_no}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik?.touched?.mobile_no && formik?.errors?.mobile_no ? (
                <div
                  style={{ color: "red", paddingLeft: 10, paddingBottom: 10 }}
                >
                  {formik?.errors?.mobile_no}
                </div>
              ) : null}
            </Grid>

            <Grid item xs={12}>
              <TextField
                id={constant.DOB}
                type="date"
                name="dob"
                InputLabelProps={{
                  shrink: true,
                }}
                style={{ padding: 10, paddingBottom: 20 }}
                value={formik?.values?.dob}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik?.touched?.dob && formik?.errors?.dob ? (
                <div
                  style={{ color: "red", paddingLeft: 10, paddingBottom: 10 }}
                >
                  {formik?.errors?.dob}
                </div>
              ) : null}
            </Grid>

            <Grid item xs={12} style={{ textAlign: "center" }}>
              <Button
                type="submit"
                variant="contained"
                style={{ color: "black", backgroundColor: "white" }}
              >
                {loader ? <CircularProgress size={25} /> : constant.EDIT}
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

export default EditProfile;
