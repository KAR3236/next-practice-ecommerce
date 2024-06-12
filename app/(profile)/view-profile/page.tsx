"use client";
import { useRouter } from "next/navigation";
import { Box, Button, Grid, Paper, TextField } from "@mui/material";
import { toast } from "react-toastify";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { hideLoader, showLoader } from "@/app/Redux/Slice/loaderSlice";
import { viewProfileAPI } from "@/app/APIs/userAPIs";
import { constant } from "@/app/Utils/constants";
import { useEffect } from "react";
import { viewUserProfile } from "@/app/Redux/Slice/userSlice";

const ViewProfile = () => {
  const navigate = useRouter();

  //Redux
  const dispatch = useDispatch();
  const { loader } = useSelector((state: any) => state?.loader);
  const { data } = useSelector((state: any) => state?.user);

  useEffect(() => {
    dispatch(showLoader());
    viewProfileAPI()
      .then((viewProfileData: any) => {
        if (viewProfileData?.data?.statusCode === 200) {
          dispatch(hideLoader());
          dispatch(viewUserProfile(viewProfileData?.data?.data));
        }
      })
      .catch((error: any) => {
        toast.error(error?.response?.data?.message);
      })
      .finally(() => {
        dispatch(hideLoader());
      });
  }, []);

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
        <Grid style={{ padding: 20, textAlign: "center" }}>
          <Grid item xs={12}>
            <h1 style={{ padding: 20, fontSize: 25 }}>
              {constant.VIEW_PROFILE}
            </h1>
          </Grid>

          <Grid item xs={12}>
            <TextField
              id={constant.EMAIL}
              type={constant.EMAIL.toLowerCase()}
              name={constant.EMAIL.toLowerCase()}
              placeholder="name@example.com"
              disabled={true}
              style={{ padding: 10 }}
              value={data?.email}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              id={constant.FIRST_NAME}
              name="first_name"
              type="text"
              placeholder="Enter your first name"
              disabled={true}
              style={{ padding: 10 }}
              value={data?.first_name}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              id={constant.LAST_NAME}
              name="last_name"
              type="text"
              placeholder="Enter your last name"
              disabled={true}
              style={{ padding: 10 }}
              value={data?.last_name}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              id={constant.MOBILE_NO}
              name="mobile_no"
              type="text"
              placeholder="Enter your Mobile No"
              disabled={true}
              style={{ padding: 10 }}
              value={data?.mobile_no}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              id={constant.DOB}
              type="date"
              name="dob"
              InputLabelProps={{
                shrink: true,
              }}
              disabled={true}
              style={{ padding: 10, paddingBottom: 20 }}
              value={data?.dob}
            />
          </Grid>

          <Grid item xs={12} style={{ textAlign: "center" }}>
            <Button
              className="bg-gray-500 hover:bg-gray-700"
              type="button"
              variant="contained"
              onClick={() => navigate.push("/edit-profile")}
            >
              {constant.EDIT_PROFILE}
            </Button>
          </Grid>
          <hr className="my-4"></hr>

          <Grid item xs={12} style={{ textAlign: "center" }}>
            <Button
              className="bg-gray-500 hover:bg-gray-700"
              type="button"
              variant="contained"
              onClick={() => navigate.push("/update-password")}
            >
              {constant.UPDATE_PASSWORD}
            </Button>
          </Grid>
          <hr className="my-4"></hr>

          <Grid item xs={12} style={{ textAlign: "center" }}>
            <Link
              className="bg-gray-500 hover:bg-gray-700"
              style={{ padding: 8, color: "white" }}
              href="/dashboard"
            >
              {constant.BACK}
            </Link>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default ViewProfile;
