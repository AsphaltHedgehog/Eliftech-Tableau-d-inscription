import { useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import validationSchema from "@/helpers/schemas";

interface ISubmitValues {
  dateOfBirth: string;
  email: string;
  fullName: string;
  heardAbout: string;
}

const initialValues = {
  fullName: "",
  email: "",
  dateOfBirth: "",
  heardAbout: ""
};

const RegistrationPage = () => {
  const { id } = useParams<{ id: string }>();

  const options = ["social media", "friends", "found myself"];

  const submitHandler = (values: ISubmitValues) => {
    const dateOfBirth = new Date(values.dateOfBirth);
    values.dateOfBirth = dateOfBirth.toISOString().split("T")[0]; //
    console.log("values:", values, "id", id);
  };

  return (
    <div className="mx-auto max-w-md">
      <h2 className="mb-4 text-xl font-bold">Sign Up to Event</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => submitHandler(values)}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <div className="mb-4">
              <label htmlFor="fullName" className="mb-1 block">
                Full Name
              </label>
              <Field
                type="text"
                id="fullName"
                name="fullName"
                className="w-full rounded-md border border-gray-300 px-3 py-2"
              />
              <ErrorMessage name="fullName" component="div" className="mt-1 text-sm text-red-500" />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="mb-1 block">
                Email
              </label>
              <Field
                type="email"
                id="email"
                name="email"
                className="w-full rounded-md border border-gray-300 px-3 py-2"
              />
              <ErrorMessage name="email" component="div" className="mt-1 text-sm text-red-500" />
            </div>
            <div className="mb-4">
              <label htmlFor="dateOfBirth" className="mb-1 block">
                Date of Birth
              </label>
              <DatePicker
                id="dateOfBirth"
                name="dateOfBirth"
                selected={values.dateOfBirth ? new Date(values.dateOfBirth) : null}
                onChange={(date) => setFieldValue("dateOfBirth", date)}
                dateFormat="MM-dd-yyyy"
                className="w-full rounded-md border border-gray-300 px-3 py-2"
              />
              <ErrorMessage name="dateOfBirth" component="div" className="mt-1 text-sm text-red-500" />
            </div>
            <div className="mb-4">
              <label className="mb-1 block">Where did you hear about this event?</label>
              {options.map((option, index) => (
                <label key={index} className="mr-4 inline-block">
                  <Field type="radio" name="heardAbout" value={option} className="mr-1" />
                  {option}
                </label>
              ))}
              <ErrorMessage name="heardAbout" component="div" className="mt-1 text-sm text-red-500" />
            </div>
            <button type="submit" className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
              Sign Up
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegistrationPage;
