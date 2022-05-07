export default function ErrorMessage({ errors, name }) {
  if (!errors[name]) {
    return null;
  }
  const errorMessage = errors[name].message;
  return <p className="mt-[12px] text-primary text-[12px]">{errorMessage}</p>;
}
