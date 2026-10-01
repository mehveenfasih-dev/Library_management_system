import {
  Box,
  Button,
  FormControlLabel,
  FormLabel,
  Link,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";

import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import FormInput from "../../components/common/FormInput";
import useForm from "../../hooks/useForm";
import { ROUTES } from "../../routes/routeConstants";
import { registerRequest } from "../../api/authApi";

import {
  showLoader,
  hideLoader,
} from "../../store/slices/appSlice";
import { useLocale } from "../../providers/LocaleProvider";
import { useNotification } from "../../providers/NotificationProvider";

const SectionTitle = ({ title, t }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        mb: 2.5,
        mt: 4,
        height: "1px",
      }}
    >
      <Typography variant="h6" fontWeight={600} sx={{ whiteSpace: "nowrap" }}>
        {t(title)}
      </Typography>

      <Box sx={{ flex: 1, height: "1px", backgroundColor: "divider" }} />
    </Box>
  );
};

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useLocale();
  const { notify } = useNotification();

  const { register, handleSubmit, watch, errors } = useForm({
    name: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    city: "",
    country: "",
    password: "",
    confirmPassword: "",
  });

  const password = watch("password");

  const validationRules = {
    name: {
      required: "Name is required",
      minLength: { value: 2, message: "Name must be at least 2 characters" },
    },

    email: {
      required: "Email is required",
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Please enter a valid email address",
      },
    },

    phone: {
      required: "Phone number is required",
      minLength: { value: 10, message: "Enter a valid phone number" },
    },

    dateOfBirth: { required: "Date of birth is required" },

    gender: { required: "Please select your gender" },

    address: { required: "Address is required" },

    city: { required: "City is required" },

    country: { required: "Country is required" },

    password: {
      required: "Password is required",
      minLength: { value: 8, message: "Password must be at least 8 characters" },
      validate: {
        hasUppercase: (value) =>
          /[A-Z]/.test(value) || "Password must contain an uppercase letter",
        hasLowercase: (value) =>
          /[a-z]/.test(value) || "Password must contain a lowercase letter",
        hasNumber: (value) => /\d/.test(value) || "Password must contain a number",
      },
    },

    confirmPassword: {
      required: "Please confirm your password",
      validate: (value) => value === password || "Passwords do not match",
    },
  };

  const onSubmit = async (data) => {
    dispatch(showLoader());

    try {
      await registerRequest(data);

      notify("Registration successful! Please sign in.");

      navigate(ROUTES.LOGIN);
    } catch (error) {
      notify(error.message, "error");
    } finally {
      dispatch(hideLoader());
    }
  };

  const twoColumnGrid = {
    display: "grid",
    gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
    columnGap: 2,
    rowGap: 2,
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 900, mx: "auto" }}>
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography variant="h4" fontWeight={700}>
          {t("Create Account")}
        </Typography>

        <Typography color="text.secondary" mt={1}>
          {t("Enter your details to create your account.")}
        </Typography>
      </Box>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <SectionTitle title="Personal Information" t={t} />

        <Box sx={twoColumnGrid}>
          <FormInput
            label="Full Name"
            name="name"
            register={register}
            error={errors.name}
            rules={validationRules.name}
          />

          <FormInput
            label="Email"
            name="email"
            type="email"
            register={register}
            error={errors.email}
            rules={validationRules.email}
          />

          <FormInput
            label="Phone Number"
            name="phone"
            register={register}
            error={errors.phone}
            rules={validationRules.phone}
          />

          <FormInput
            label="Date of Birth"
            name="dateOfBirth"
            type="date"
            register={register}
            error={errors.dateOfBirth}
            rules={validationRules.dateOfBirth}
          />
        </Box>

        <Box sx={{ mt: 3 }}>
          <FormLabel component="legend" sx={{ color: "text.primary", fontWeight: 500 }}>
            {t("Gender")}
          </FormLabel>

          <RadioGroup
            row
            {...register("gender", validationRules.gender)}
            sx={{ display: "flex", flexDirection: "row", gap: 2, mt: 0.5 }}
          >
            <FormControlLabel value="male" control={<Radio />} label={t("Male")} />
            <FormControlLabel value="female" control={<Radio />} label={t("Female")} />
            <FormControlLabel value="other" control={<Radio />} label={t("Other")} />
          </RadioGroup>

          {errors.gender && (
            <Typography variant="caption" color="error">
              {t(errors.gender.message)}
            </Typography>
          )}
        </Box>

        <SectionTitle title="Address" t={t} />

        <FormInput
          label="Address"
          name="address"
          register={register}
          error={errors.address}
          rules={validationRules.address}
        />

        <Box sx={{ ...twoColumnGrid, mt: 2 }}>
          <FormInput
            label="City"
            name="city"
            register={register}
            error={errors.city}
            rules={validationRules.city}
          />

          <FormInput
            label="Country"
            name="country"
            register={register}
            error={errors.country}
            rules={validationRules.country}
          />
        </Box>

        <SectionTitle title="Account Information" t={t} />

        <Box sx={twoColumnGrid}>
          <FormInput
            label="Password"
            name="password"
            type="password"
            register={register}
            error={errors.password}
            rules={validationRules.password}
          />

          <FormInput
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            register={register}
            error={errors.confirmPassword}
            rules={validationRules.confirmPassword}
          />
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
          {t("Create Account")}
        </Button>
      </form>

      <Typography textAlign="center" mt={3} color="text.secondary">
        {t("Already have an account?")}{" "}
        <Link component={RouterLink} to={ROUTES.LOGIN} underline="hover">
          {t("Sign in")}
        </Link>
      </Typography>
    </Box>
  );
};

export default Register;