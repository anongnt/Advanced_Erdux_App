import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Avatar from "@mui/material/Avatar";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import YupPassword from "yup-password";
import { RemoveRoadSharp } from "@mui/icons-material";
YupPassword(yup); // extend yup
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import { useAccount } from "./../../hooks/use-account";
import { useAppDispatch } from "./../../redux-toolkit/hooks";
import { updateAccountThunk } from "../../redux-toolkit/auth/auth-thunk";
import { getCurrentAccountThunk } from "./../../redux-toolkit/auth/auth-thunk";

export default function DEditProfile() {
  const navigate = useNavigate();
  const { account } = useAccount();
  const dispatch = useAppDispatch();

  const schema = yup.object().shape({
    firstName: yup.string().required("ป้อนข้อมูลชื่อด้วย"),
    lastName: yup.string().required("ป้อนข้อมูลนามสกุลด้วย"),
  });

  type FormData = yup.InferType<typeof schema>;

  const {
    register,
    handleSubmit,

    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: "all",
  });

  const onSubmit = async (data: FormData) => {
    try {
      dispatch(
        updateAccountThunk({
          userId: account?.userId,
          acc: {
            firstName: data.firstName,
            lastName: data.lastName,
          },
        })
      );

      dispatch(getCurrentAccountThunk(account?.userId!));

      toast.success("แก้ไขข้อมูลส่วนตัวสำเร็จ");
      navigate("../"); // กลับหน้า /dashboard
    } catch (error: any) {
      toast.error(error);
    }
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar src={account?.photoUrl} sx={{ width: 62, height: 62 }} />

          <IconButton
            color="primary"
            aria-label="upload picture"
            component="label"
          >
            <input hidden accept="image/*" type="file" />
            <PhotoCamera sx={{ fontSize: 40 }} />
          </IconButton>

          <Typography component="h1" variant="h5">
            แก้ไขข้อมูลส่วนตัว
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register("firstName")}
                  error={errors.firstName ? true : false}
                  helperText={errors.firstName && errors.firstName.message}
                  fullWidth
                  label="First Name"
                  defaultValue={account?.firstName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register("lastName")}
                  error={errors.lastName ? true : false}
                  helperText={errors.lastName && errors.lastName.message}
                  fullWidth
                  label="Last Name"
                  defaultValue={account?.lastName}
                />
              </Grid>
            </Grid>

            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              loading={isSubmitting}
              loadingIndicator={
                <Typography sx={{ color: "reb" }}>
                  กำลังแก้ไขข้อมูล รอสักครู่...
                </Typography>
              }
            >
              บันทึก
            </LoadingButton>
          </Box>
        </Box>
      </Container>
    </>
  );
}
