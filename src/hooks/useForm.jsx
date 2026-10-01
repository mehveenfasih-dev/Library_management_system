import { useRef, useState } from "react";

const useForm = (initialValues = {}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const rulesRef = useRef({});

  const validateField = (name, value, rules = {}) => {
   
    if (rules.required) {
      const isEmpty =
        value === undefined ||
        value === null ||
        value.toString().trim() === "";

      if (isEmpty) {
        return typeof rules.required === "string"
          ? rules.required
          : `${name} is required`;
      }
    }

   
    if (
      rules.minLength &&
      value &&
      value.length < rules.minLength.value
    ) {
      return rules.minLength.message;
    }

  
    if (
      rules.pattern &&
      value &&
      !rules.pattern.value.test(value)
    ) {
      return rules.pattern.message;
    }

   
    if (rules.validate) {
   
      if (typeof rules.validate === "function") {
        const result = rules.validate(value, values);

        if (result !== true) {
          return result;
        }
      }

    
      if (typeof rules.validate === "object") {
        for (const validation of Object.values(rules.validate)) {
          const result = validation(value, values);

          if (result !== true) {
            return result;
          }
        }
      }
    }

    return "";
  };

  const register = (name, rules = {}) => {
  
    rulesRef.current[name] = rules;

    return {
      name,
      value: values[name] ?? "",

      onChange: (event) => {
        const value = event.target.value;

        setValues((prev) => ({
          ...prev,
          [name]: value,
        }));

       
        if (errors[name]) {
          setErrors((prev) => {
            const updatedErrors = { ...prev };

            delete updatedErrors[name];

            return updatedErrors;
          });
        }
      },

      onBlur: (event) => {
        const value = event.target.value;

        const error = validateField(
          name,
          value,
          rules
        );

        setErrors((prev) => ({
          ...prev,
          [name]: error,
        }));
      },
    };
  };

  const handleSubmit = (onSubmit) => {
    return (event) => {
      event.preventDefault();

      const newErrors = {};

      
      Object.entries(rulesRef.current).forEach(
        ([name, rules]) => {
          const error = validateField(
            name,
            values[name],
            rules
          );

          if (error) {
            newErrors[name] = error;
          }
        }
      );

      setErrors(newErrors);

    
      if (Object.keys(newErrors).length === 0) {
        onSubmit(values);
      }
    };
  };

  const watch = (name) => {
    return values[name];
  };

  const setValue = (name, value) => {
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));

   
    if (errors[name]) {
      setErrors((prev) => {
        const updatedErrors = { ...prev };

        delete updatedErrors[name];

        return updatedErrors;
      });
    }
  };

  return {
    values,
    errors,
    register,
    handleSubmit,
    watch,
    setValue,
  };
};

export default useForm;