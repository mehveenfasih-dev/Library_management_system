import {
  Box,
  Button,
  Link,
  Typography,
} from "@mui/material";

import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";

import { useForm } from "react-hook-form";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import FormInput from "../../components/common/FormInput";
import { ROUTES } from "../../routes/routeConstants";
import { getUser } from "../../utils/storage";

import { login } from "../../store/slices/authSlice";
import {
  showLoader,
  hideLoader,
  showNotification,
} from "../../store/slices/uiSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  const onSubmit = (data) => {
    dispatch(showLoader());

    try {
      const storedUser = getUser();

      if (!storedUser) {
        dispatch(
          showNotification({
            message: "No account found. Please register first.",
            severity: "error",
          })
        );
        return;
      }

      if (
        data.email !== storedUser.email ||
        data.password !== storedUser.password
      ) {
        dispatch(
          showNotification({
            message: "Invalid email or password.",
            severity: "error",
          })
        );
        return;
      }

      dispatch(login(storedUser));

      dispatch(
        showNotification({
          message: "Login successful!",
          severity: "success",
        })
      );

      navigate(ROUTES.DASHBOARD);
    } catch (error) {
      console.error("LOGIN ERROR:", error);

      dispatch(
        showNotification({
          message: "Something went wrong during login.",
          severity: "error",
        })
      );
    } finally {
      dispatch(hideLoader());
    }
  };

  return (
    <Box>
{/*      
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Box
          sx={{
            width: 44,
            height: 44,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 2.5,
            backgroundColor: "primary.main",
            color: "#FFFFFF",
            mb: 1.5,
          }}
        >
          <MenuBookRoundedIcon sx={{ fontSize: 30 }} />
        </Box>

        */}

{/*       
      </Box> */}

      <Box sx={{ textAlign: "center", mb: 3 }}>
        <Typography
          variant="h4"
          fontWeight={900}
          mb={1}
        >
          Sign In
        </Typography>

        <Typography color="text.secondary">
          Welcome back! Please sign in to continue.
        </Typography>
      </Box>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <FormInput
          label="Email"
          name="email"
          type="email"
          register={register}
          error={errors.email}
          rules={{
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Enter a valid email address",
            },
          }}
        />

        <FormInput
          label="Password"
          name="password"
          type="password"
          register={register}
          error={errors.password}
          rules={{
            required: "Password is required",
          }}
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          size="large"
          sx={{
            mt: 2,
            py: 1.4,
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          Sign In
        </Button>
      </form>

      {/* Register */}
      <Typography
        textAlign="center"
        mt={3}
        color="text.secondary"
      >
        Don't have an account?{" "}
        <Link
          component={RouterLink}
          to={ROUTES.REGISTER}
          underline="hover"
        >
          Create an account
        </Link>
      </Typography>

      {/* Contact */}
      <Typography
        textAlign="center"
        mt={1}
        color="text.secondary"
      >
        <Link
          component={RouterLink}
          to={ROUTES.CONTACT}
          underline="hover"
        >
          Contact Us
        </Link>
      </Typography>
    </Box>
  );
};

export default Login;