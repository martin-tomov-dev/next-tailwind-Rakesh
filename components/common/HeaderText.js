// TODO: Mk header element flexible, arg passed - h1, h2, h3
export default function TitleText({ text }) {
  return (
    <h1 className="font-avenirBold text-secondary text-center font-bold text-[36px]">
      {text}
    </h1>
  );
}
