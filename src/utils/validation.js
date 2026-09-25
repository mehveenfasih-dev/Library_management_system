export const validateEmail = (email) => {
  if (!email) {
    return "Email is required";
  }

  if (!/\S+@\S+\.\S+/.test(email)) {
    return "Enter a valid email";
  }

  return true;
};

export const validatePassword = (password) => {
  if (!password) {
    return "Password is required";
  }

  if (password.length < 6) {
    return "Password must be at least 6 characters";
  }

  return true;
};