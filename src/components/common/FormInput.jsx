import { TextField } from "@mui/material";

const FormInput = ({
  label,
  name,
  type = "text",
  register,
  error,
  rules,
}) => {
  return (
    <TextField
      fullWidth
      label={label}
      type={type}
      margin="normal"
      slotProps={{
        inputLabel: {
          shrink: type === "date" ? true : undefined,
        },
      }}
      {...register(name, rules)}
      error={Boolean(error)}
      helperText={error?.message || ""}
    />
  );
};

export default FormInput;