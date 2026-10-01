import { TextField } from "@mui/material"
import PropTypes from "prop-types"
import { useLocale } from "../../providers/LocaleProvider"

const FormInput = ({ label, name, type = "text", register, error, rules, select, children }) => {
  const { t } = useLocale()
  const { ref, ...field } = register(name, rules)
  const message = typeof error === "string" ? error : error?.message

  return (
    <TextField
      fullWidth
      select={select}
      label={t(label)}
      type={type}
      margin="normal"
      inputRef={ref}
      slotProps={{ inputLabel: { shrink: type === "date" ? true : undefined } }}
      {...field}
      error={Boolean(error)}
      helperText={message ? t(message) : ""}
    >
      {children}
    </TextField>
  )
}

FormInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  register: PropTypes.func.isRequired,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  rules: PropTypes.object,
  select: PropTypes.bool,
  children: PropTypes.node,
}

export default FormInput
