import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  fullName: Yup.string().required("Full Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  dateOfBirth: Yup.date().required("Date of Birth is required"),
  heardAbout: Yup.string().required("Please select an option")
});

export default validationSchema;
