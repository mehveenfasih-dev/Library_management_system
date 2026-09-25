
import { Box, Button, Link, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { Link as RouterLink } from "react-router-dom";
import { useDispatch } from "react-redux";

import FormInput from "../../components/common/FormInput";
import { ROUTES } from "../../routes/routeConstants";
import { saveUser } from "../../utils/storage";
import { showLoader, hideLoader, showNotification } from "../../store/slices/uiSlice";

const Register = () => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  const password = watch("password");

  const onSubmit = (data) => {
    dispatch(showLoader());

    try {
      const existingUser = localStorage.getItem("user");

      if (existingUser) {
        dispatch(
          showNotification({
            message: "An account already exists. Please sign in.",
            severity: "error",
          })
        );
        return;
      }

      const user = {
        name: data.name,
        email: data.email,
        password: data.password,
      };

      saveUser(user);

      dispatch(
        showNotification({
          message: "Registration successful. Please sign in.",
          severity: "success",
        })
      );

     
    } catch (error) {
      dispatch(
        showNotification({
          message: "Something went wrong. Please try again.",
          severity: "error",
        })
      );
    } finally {
      dispatch(hideLoader());
    }
  };

  return (
    <Box>
      <Typography variant="h4" textAlign="center" mb={3}>
        Create Account
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <FormInput
          label="Name"
          name="name"
          register={register}
          error={errors.name}
          rules={{
            required: "Name is required",
            minLength: {
              value: 2,
              message: "Name must be at least 2 characters",
            },
          }}
        />

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
              message: "Please enter a valid email address",
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
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
            validate: {
              hasUppercase: (value) =>
                /[A-Z]/.test(value) ||
                "Password must contain an uppercase letter",
              hasLowercase: (value) =>
                /[a-z]/.test(value) ||
                "Password must contain a lowercase letter",
              hasNumber: (value) =>
                /\d/.test(value) ||
                "Password must contain a number",
            },
          }}
        />

        <FormInput
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          register={register}
          error={errors.confirmPassword}
          rules={{
            required: "Please confirm your password",
            validate: (value) =>
              value === password || "Passwords do not match",
          }}
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
        >
          Register
        </Button>
      </form>

      <Typography textAlign="center" mt={3}>
        Already have an account?{" "}
        <Link
          component={RouterLink}
          to={ROUTES.LOGIN}
          underline="hover"
        >
          Sign in
        </Link>
      </Typography>
    </Box>
  );
};

export default Register;

