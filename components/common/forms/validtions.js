export const validations = {
  alphabet: {
    value: /[a-zA-Z]+/,
    message: "Must be in letter format.",
  },
  email: {
    value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
    message: "Not in correct email pattern.",
  },
  telephone: {
    value: /^(\d{10})$/,
    message: "Telephone must be numeric and 10 digits.",
  },
};
