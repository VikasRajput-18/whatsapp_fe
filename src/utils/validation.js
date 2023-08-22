import * as Yup from "yup";

export const signupSchema = Yup.object({
  name: Yup.string()
    .required("Name is required")
    .matches(/^[a-zA-Z_ ]*$/, "No Special characters allowed.")
    .min(3, "Name must be between 3 and 16 characters.")
    .max(32, "Name must be between 3 and 16 characters."),
  email: Yup.string()
    .required("Email address is required.")
    .email("Invalid email address."),
  status: Yup.string().max(128, "Status must be less than 128 characters."),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$[!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
      "Password must contain atleast 6 characters , 1 uppercase , 1 lowercase , 1 number and 1 special character."
    ),
});
export const signinSchema = Yup.object({
  email: Yup.string()
    .required("Email address is required.")
    .email("Invalid email address."),
  password: Yup.string().required("Password is required"),
});
