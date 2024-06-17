"use client";
import { useRouter } from "next/navigation";
import { Box, CircularProgress, Grid, Paper } from "@mui/material";
import { toast } from "react-toastify";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { hideLoader, showLoader } from "@/app/Redux/Slice/loaderSlice";
import { deleteAddressAPI, listOfUserAddressesAPI } from "@/app/APIs/userAPIs";
import { constant } from "@/app/Utils/constants";
import { useEffect } from "react";
import { listOfUserAddresses } from "@/app/Redux/Slice/userSlice";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import HomeWorkIcon from "@mui/icons-material/HomeWork";

const ViewAddress = () => {
  const navigate = useRouter();

  //Redux
  const dispatch = useDispatch();
  const { loader } = useSelector((state: any) => state?.loader);
  const { datas } = useSelector((state: any) => state?.user);

  useEffect(() => {
    dispatch(showLoader());
    listOfUserAddressesAPI()
      .then((listOfAddressesData: any) => {
        if (listOfAddressesData?.data?.statusCode === 200) {
          dispatch(hideLoader());
          dispatch(listOfUserAddresses(listOfAddressesData?.data?.data));
        }
      })
      .catch((error: any) => {
        toast.error(error?.response?.data?.message);
      })
      .finally(() => {
        dispatch(hideLoader());
      });
  }, []);

  const handleClick = (id: number) => {
    navigate.push(`/edit-address/${id}`);
  };

  const handleDelete = (id: number) => {
    deleteAddressAPI(id)
      .then((deletedAddressesData: any) => {
        if (deletedAddressesData?.data?.statusCode === 200) {
          toast.success(deletedAddressesData?.data?.message);
          dispatch(hideLoader());
          listOfUserAddressesAPI()
            .then((listOfAddressesData: any) => {
              if (listOfAddressesData?.data?.statusCode === 200) {
                dispatch(hideLoader());
                dispatch(listOfUserAddresses(listOfAddressesData?.data?.data));
              }
            })
            .catch((error: any) => {
              toast.error(error?.response?.data?.message);
            })
            .finally(() => {
              dispatch(hideLoader());
            });
        }
      })
      .catch((error: any) => {
        toast.error(error?.response?.data?.message);
      })
      .finally(() => {
        dispatch(hideLoader());
      });
  };

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
          {loader ? (
            <CircularProgress size={25} />
          ) : (
            <>
              <Grid item xs={12}>
                <h1 style={{ padding: 20, fontSize: 25 }}>
                  {constant.VIEW_ADDRESS}
                </h1>
              </Grid>
              <Grid item xs={12} style={{ paddingBottom: 25 }}>
                <Link
                  href="/add-address"
                  className="bg-sky-500 hover:bg-sky-700"
                  style={{ padding: 8 }}
                >
                  {constant.ADD_ADDRESS}
                </Link>
              </Grid>
              <Grid item xs={12}>
                <Stack direction="column" spacing={3}>
                  {datas &&
                    datas.map((data: any, index: any) => (
                      <Chip
                        avatar={<HomeWorkIcon />}
                        key={index}
                        label={`${data?.address_line_1}, ${data?.address_line_2}, ${data?.city}, ${data?.state}, ${data?.country}, ${data?.pin_code}`}
                        sx={{
                          height: "auto",
                          "& .MuiChip-label": {
                            display: "block",
                            whiteSpace: "normal",
                          },
                        }}
                        onClick={() => handleClick(data.id)}
                        onDelete={() => handleDelete(data.id)}
                      />
                    ))}
                </Stack>
              </Grid>
              <br />
              <Grid item xs={12} style={{ textAlign: "center" }}>
                <Link
                  className="bg-gray-500 hover:bg-gray-700"
                  style={{ padding: 8, color: "white" }}
                  href="/dashboard"
                >
                  {constant.BACK}
                </Link>
              </Grid>
            </>
          )}
        </Grid>
      </Paper>
    </Box>
  );
};

export default ViewAddress;
