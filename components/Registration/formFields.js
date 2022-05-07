import { validations } from "../common/forms/validtions";

export const formFields = {
  firstName: {
    name: "firstName",
    placeholder: "First Name *",
    required: true,
    validations: {
      required: "First name field is required",
      pattern: validations.alphabet,
    },
  },
  lastName: {
    name: "lastName",
    placeholder: "Last Name *",
    validations: {
      required: "Last name field is required",
      pattern: validations.alphabet,
    },
  },
  email: {
    placeholder: "Email *",
    name: "email",
    type: "email",
    validations: {
      required: "Email field is required",
      pattern: validations.email,
    },
  },
  address1: {
    placeholder: "Address 1",
    name: "address1",
    validations: {},
  },
  address2: {
    placeholder: "Address 2",
    name: "address2",
    validations: {},
  },
  city: {
    placeholder: "City *",
    name: "city",
    validations: {
      required: "City Field is required.",
      pattern: validations.alphabet,
    },
  },
  zip: {
    placeholder: "Zip Code *",
    name: "zip",
    type: "number",
    validations: {
      required: "Zip Code field is required.",
    },
  },
  phoneNumber: {
    placeholder: "Phone Number *",
    name: "phoneNumber",
    type: "tel",
    validations: {
      required: "Phone Number field is required.",
      pattern: validations.telephone,
    },
  },
  hourlyRate: {
    placeholder: "Desired Hourly Rate",
    name: "hourlyRate",
    type: "number",
    validations: {},
  },
  yearlySalary: {
    placeholder: "Desired Yearly Salary",
    name: "yearlySalary",
    type: "number",
    validations: {},
  },
};
