import js from "@eslint/js";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";

export default [
  js.configs.recommended,

  {
    files: ["**/*.{js,jsx}"],

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",

      globals: {
        window: "readonly",
        document: "readonly",
        localStorage: "readonly",
        console: "readonly",
      },
    },

    plugins: {
      react,
      "react-hooks": reactHooks,
    },

    settings: {
      react: {
        version: "detect",
      },
    },

    rules: {
   
      "no-var": "error",
      "prefer-const": "error",
      "no-unused-vars": "error",
      "eqeqeq": "error",

     
      "no-console": "warn",
      "no-debugger": "error",


      "no-redeclare": "error",
      "no-shadow": "warn",
      "no-unreachable": "error",
      "no-duplicate-case": "error",
      "no-duplicate-imports": "error",

   
      "prefer-template": "warn",
      "prefer-arrow-callback": "warn",
      "quotes": ["error", "double"],
      "semi": ["warn", "never"],

  
      "react/jsx-uses-vars": "error",
      "react/react-in-jsx-scope": "off",

    
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
    },
  },
];