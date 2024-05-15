import { useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import validationSchema from "@/helpers/schemas";
import { useRegisterInMutation } from "@/redux/eventsApi/operations";
import { useEffect } from "react";
import { toast } from "react-toastify";

interface ISubmitValues {
  dateOfBirth: string;
  email: string;
  name: string;
  heardAbout: string;
}

const initialValues = {
  name: "",
  email: "",
  dateOfBirth: "",
  heardAbout: ""
};

const RegistrationPage = () => {
  const { id } = useParams<{ id: string }>();
  const [register, { isLoading, isSuccess, isError }] = useRegisterInMutation();
  const options = ["social-media", "friends", "myself"];

  const submitHandler = (values: ISubmitValues) => {
    if (!id) {
      return;
    }
    const data = {
      ...values,
      event: id
    };
    data.dateOfBirth = new Date(values.dateOfBirth).toISOString().split("T")[0];
    register(data);
  };

  useEffect(() => {
    if (isLoading) {
      toast.info("Completing registration...");
    }
    if (isSuccess) {
      toast.success("Registration on Event completed successfully");
    }
    if (isError) {
      toast.error("Email already registered");
    }
  }, [isError, isLoading, isSuccess]);

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
              <label htmlFor="name" className="mb-1 block">
                Full Name
              </label>
              <Field type="text" id="name" name="name" className="w-full rounded-md border border-gray-300 px-3 py-2" />
              <ErrorMessage name="name" component="div" className="mt-1 text-sm text-red-500" />
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
