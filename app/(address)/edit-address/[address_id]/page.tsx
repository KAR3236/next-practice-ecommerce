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
import { addAddressValidation } from "@/app/Validations/userValidation";
import { hideLoader, showLoader } from "@/app/Redux/Slice/loaderSlice";
import { updateAddressAPI, viewAddressAPI } from "@/app/APIs/userAPIs";
import { constant } from "@/app/Utils/constants";
import { Form } from "@/app/Components/Form";
import { useEffect } from "react";

const EditAddress = ({ params }: { params: { address_id: string } }) => {
  const navigate = useRouter();

  //Redux
  const dispatch = useDispatch();
  const { loader } = useSelector((state: any) => state?.loader);

  useEffect(() => {
    dispatch(showLoader());
    viewAddressAPI(params.address_id)
      .then((viewAddressData: any) => {
        if (viewAddressData?.data?.statusCode === 200) {
          dispatch(hideLoader());
          formik.setValues(viewAddressData?.data?.data);
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
      address_line_1: "",
      address_line_2: "",
      city: "",
      state: "",
      country: "",
      pin_code: "",
    },
    validationSchema: addAddressValidation,
    onSubmit: (values) => {
      dispatch(showLoader());
      updateAddressAPI(params.address_id, values)
        .then((addressData: any) => {
          if (addressData?.data?.statusCode === 202) {
            toast.success(addressData?.data?.message);
            navigate.push("/view-address");
          } else {
            toast.error(addressData?.data?.message);
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
                {constant.EDIT_ADDRESS}
              </h1>
            </Grid>

            <Grid item xs={12}>
              <TextField
                id={constant.ADDRESS_LINE_1}
                label={constant.ADDRESS_LINE_1}
                type="text"
                name="address_line_1"
                placeholder="House name, Building name, Socity name, Apartment name"
                style={{ padding: 10 }}
                value={formik?.values?.address_line_1}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik?.touched?.address_line_1 &&
              formik?.errors?.address_line_1 ? (
                <div
                  style={{ color: "red", paddingLeft: 10, paddingBottom: 10 }}
                >
                  {formik?.errors?.address_line_1}
                </div>
              ) : null}
            </Grid>

            <Grid item xs={12}>
              <TextField
                id={constant.ADDRESS_LINE_2}
                label={constant.ADDRESS_LINE_2}
                type="text"
                name="address_line_2"
                placeholder="Area, Near place, Landmark"
                style={{ padding: 10 }}
                value={formik?.values?.address_line_2}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik?.touched?.address_line_2 &&
              formik?.errors?.address_line_2 ? (
                <div
                  style={{ color: "red", paddingLeft: 10, paddingBottom: 10 }}
                >
                  {formik?.errors?.address_line_2}
                </div>
              ) : null}
            </Grid>

            <Grid item xs={12}>
              <TextField
                id={constant.CITY}
                label={constant.CITY}
                type="text"
                name="city"
                placeholder="Enter your city name"
                style={{ padding: 10 }}
                value={formik?.values?.city}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik?.touched?.city && formik?.errors?.city ? (
                <div
                  style={{ color: "red", paddingLeft: 10, paddingBottom: 10 }}
                >
                  {formik?.errors?.city}
                </div>
              ) : null}
            </Grid>

            <Grid item xs={12}>
              <TextField
                id={constant.STATE}
                label={constant.STATE}
                type="text"
                name="state"
                placeholder="Enter your state name"
                style={{ padding: 10 }}
                value={formik?.values?.state}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik?.touched?.state && formik?.errors?.state ? (
                <div
                  style={{ color: "red", paddingLeft: 10, paddingBottom: 10 }}
                >
                  {formik?.errors?.state}
                </div>
              ) : null}
            </Grid>

            <Grid item xs={12}>
              <TextField
                id={constant.COUNTRY}
                label={constant.COUNTRY}
                type="text"
                name="country"
                placeholder="Enter your county name"
                style={{ padding: 10 }}
                value={formik?.values?.country}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik?.touched?.country && formik?.errors?.country ? (
                <div
                  style={{ color: "red", paddingLeft: 10, paddingBottom: 10 }}
                >
                  {formik?.errors?.country}
                </div>
              ) : null}
            </Grid>

            <Grid item xs={12}>
              <TextField
                id={constant.PIN_CODE}
                label={constant.PIN_CODE}
                type="text"
                name="pin_code"
                placeholder="Enter your city name"
                style={{ padding: 10 }}
                value={formik?.values?.pin_code}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik?.touched?.pin_code && formik?.errors?.pin_code ? (
                <div
                  style={{ color: "red", paddingLeft: 10, paddingBottom: 10 }}
                >
                  {formik?.errors?.pin_code}
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
                href="/view-address"
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

export default EditAddress;
