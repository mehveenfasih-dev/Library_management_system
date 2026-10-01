import { Box, Button, Link, Typography } from "@mui/material"
import { useForm } from "react-hook-form"
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"

import FormInput from "../../components/common/FormInput"
import { loginRequest } from "../../api/authApi"
import { ROUTES } from "../../routes/routeConstants"
import { hideLoader, showLoader } from "../../store/slices/appSlice"
import { useLocale } from "../../providers/LocaleProvider"
import { useAuth } from "../../providers/AuthProvider"
import { useNotification } from "../../providers/NotificationProvider"

const identifierRules = {
  required: "Email or username is required",
}

const Login = () => {
  const dispatch = useDispatch()
  const { t } = useLocale()
  const { signIn } = useAuth()
  const { notify } = useNotification()
  const navigate = useNavigate()
  const location = useLocation()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" })

  const redirectTo = location.state?.from?.pathname ?? ROUTES.CATALOG

  const onSubmit = async (data) => {
    dispatch(showLoader())

    try {
      const session = await loginRequest(data)

      signIn(session)
      notify(`${t("Welcome back")}, ${session.user.name}!`)
      navigate(redirectTo, { replace: true })
    } catch (error) {
      notify(error.message, "error")
    } finally {
      dispatch(hideLoader())
    }
  }

  return (
    <Box>
      <Box sx={{ textAlign: "center", mb: 3 }}>
        <Typography variant="h4" fontWeight={800} mb={1}>
          {t("Sign in")}
        </Typography>
        <Typography color="text.secondary">{t("Welcome back! Please sign in to continue.")}</Typography>
      </Box>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <FormInput
          label={t("Email or username")}
          name="email"
          register={register}
          error={errors.email}
          rules={identifierRules}
        />

        <FormInput
          label={t("Password")}
          name="password"
          type="password"
          register={register}
          error={errors.password}
          rules={{ required: "Password is required" }}
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          size="large"
          sx={{ mt: 2, py: 1.4, borderRadius: 2, textTransform: "none", fontWeight: 600 }}
        >
          {t("Sign in")}
        </Button>
      </form>

      <Typography textAlign="center" mt={3} color="text.secondary">
        {t("Do not have an account?")}{" "}
        <Link component={RouterLink} to={ROUTES.REGISTER} underline="hover">
          {t("Create an account")}
        </Link>
      </Typography>

      <Typography textAlign="center" mt={1}>
        <Link component={RouterLink} to={ROUTES.CATALOG} underline="hover">
          {t("Continue as guest")}
        </Link>
      </Typography>

     
    </Box>
  )
}

export default Login