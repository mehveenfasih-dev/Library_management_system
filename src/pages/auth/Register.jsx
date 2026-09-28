import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Link,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";

import { Link as RouterLink } from "react-router-dom";
import { useDispatch } from "react-redux";

import FormInput from "../../components/common/FormInput";
import { ROUTES } from "../../routes/routeConstants";
import { saveUser } from "../../utils/storage";

import {
  showLoader,
  hideLoader,
  showNotification,
} from "../../store/slices/uiSlice";

const SectionTitle = ({ title }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        mb: 2.5,
        mt: 4,
      }}
    >
      <Typography
        variant="h6"
        fontWeight={600}
        sx={{
          whiteSpace: "nowrap",
        }}
      >
        {title}
      </Typography>

      <Box
        sx={{
          flex: 1,
          height: "1px",
          backgroundColor: "divider",
        }}
      />
    </Box>
  );
};

const Register = () => {
  const dispatch = useDispatch();

  const [permissionsOpen, setPermissionsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      role: "user",
      permissions: [],
    },
  });

  const password = watch("password");
  const selectedRole = watch("role");

  const handleRoleChange = (event) => {
    const role = event.target.value;

    setValue("role", role, {
      shouldValidate: true,
      shouldDirty: true,
    });

    if (role === "admin") {
      setPermissionsOpen(true);
    } else {
      setPermissionsOpen(false);
      setValue("permissions", []);
    }
  };

  const handlePermissionsClose = () => {
    console.log("Selected permissions:", getValues("permissions"));
    setPermissionsOpen(false);
  };

  const onSubmit = (data) => {
    console.log("FORM DATA:", data);

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
        phone: data.phone,
        dateOfBirth: data.dateOfBirth,
        gender: data.gender,
        address: data.address,
        city: data.city,
        country: data.country,
        password: data.password,
        role: data.role,
        permissions:
          data.role === "admin" ? data.permissions || [] : [],
      };

      console.log("SAVED USER:", user);

      saveUser(user);

      dispatch(
        showNotification({
          message: "Registration successful. Please sign in.",
          severity: "success",
        })
      );
    } catch (error) {
      console.error("REGISTER ERROR:", error);

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

  const twoColumnGrid = {
    display: "grid",
    gridTemplateColumns: {
      xs: "1fr",
      md: "1fr 1fr",
    },
    columnGap: 2,
    rowGap: 2,
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 900,
        mx: "auto",
      }}
    >
      <Box
        sx={{
          textAlign: "center",
          mb: 4,
        }}
      >
        <Typography
          variant="h4"
          fontWeight={700}
        >
          Create Account
        </Typography>

        <Typography
          color="text.secondary"
          mt={1}
        >
          Enter your details to create your account.
        </Typography>
      </Box>

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <SectionTitle title="Personal Information" />

        <Box sx={twoColumnGrid}>
          <FormInput
            label="Full Name"
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
            label="Phone Number"
            name="phone"
            register={register}
            error={errors.phone}
            rules={{
              required: "Phone number is required",
              minLength: {
                value: 10,
                message: "Enter a valid phone number",
              },
            }}
          />

          <FormInput
            label="Date of Birth"
            name="dateOfBirth"
            type="date"
            register={register}
            error={errors.dateOfBirth}
            rules={{
              required: "Date of birth is required",
            }}
          />
        </Box>

        <Box sx={{ mt: 3 }}>
          <FormLabel
            component="legend"
            sx={{
              color: "text.primary",
              fontWeight: 500,
            }}
          >
            Gender
          </FormLabel>

          <RadioGroup
            row
            {...register("gender", {
              required: "Please select your gender",
            })}
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 2,
              mt: 0.5,
            }}
          >
            <FormControlLabel
              value="male"
              control={<Radio />}
              label="Male"
            />

            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
            />

            <FormControlLabel
              value="other"
              control={<Radio />}
              label="Other"
            />
          </RadioGroup>

          {errors.gender && (
            <Typography
              variant="caption"
              color="error"
            >
              {errors.gender.message}
            </Typography>
          )}
        </Box>

        <SectionTitle title="Address" />

        <FormInput
          label="Address"
          name="address"
          register={register}
          error={errors.address}
          rules={{
            required: "Address is required",
          }}
        />

        <Box
          sx={{
            ...twoColumnGrid,
            mt: 2,
          }}
        >
          <FormInput
            label="City"
            name="city"
            register={register}
            error={errors.city}
            rules={{
              required: "City is required",
            }}
          />

          <FormInput
            label="Country"
            name="country"
            register={register}
            error={errors.country}
            rules={{
              required: "Country is required",
            }}
          />
        </Box>

        <SectionTitle title="Account Information" />

        <Box sx={twoColumnGrid}>
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
                value === password ||
                "Passwords do not match",
            }}
          />
        </Box>

        <SectionTitle title="Role & Permissions" />

        <Box>
          <FormLabel
            component="legend"
            sx={{
              color: "text.primary",
              fontWeight: 500,
            }}
          >
            Account Role
          </FormLabel>

          <RadioGroup
            row
            value={selectedRole}
            onChange={handleRoleChange}
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 2,
              mt: 0.5,
            }}
          >
            <FormControlLabel
              value="user"
              control={<Radio />}
              label="User"
            />

            <FormControlLabel
              value="admin"
              control={<Radio />}
              label="Admin"
            />
          </RadioGroup>
        </Box>

        <Button
          type="submit"
          variant="contained"
          fullWidth
          size="large"
          sx={{
            mt: 5,
            py: 1.5,
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 600,
            fontSize: "1rem",
          }}
        >
          Create Account
        </Button>
      </form>

      <Dialog
        open={permissionsOpen}
        onClose={handlePermissionsClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          Admin Permissions
        </DialogTitle>

        <DialogContent>
          <Typography
            color="text.secondary"
            mb={2}
          >
            Select the permissions for this admin account.
          </Typography>

          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  {...register("permissions")}
                  value="view_books"
                />
              }
              label="View Books"
            />

            <FormControlLabel
              control={
                <Checkbox
                  {...register("permissions")}
                  value="manage_books"
                />
              }
              label="Manage Books"
            />

            <FormControlLabel
              control={
                <Checkbox
                  {...register("permissions")}
                  value="manage_library"
                />
              }
              label="Manage Library"
            />

            <FormControlLabel
              control={
                <Checkbox
                  {...register("permissions")}
                  value="manage_users"
                />
              }
              label="Manage Users"
            />
          </FormGroup>
        </DialogContent>

        <DialogActions
          sx={{
            px: 3,
            pb: 2,
          }}
        >
          <Button
            onClick={handlePermissionsClose}
            variant="contained"
          >
            Done
          </Button>
        </DialogActions>
      </Dialog>

      <Typography
        textAlign="center"
        mt={3}
        color="text.secondary"
      >
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