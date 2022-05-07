import { btnStyles } from "./Buttons/buttonStyles";
export default function Button({
  type = "primary",
  children,
  label,
  icon,
  onClick,
}) {
  const textClasses = "w-full font-bold text-[13px]";
  return (
    <button
      className={`${btnStyles[type].join(" ")}`}
      role="button"
      onClick={onClick}
    >
      {icon && <span className="h-5">{icon}</span>}{" "}
      <span
        className={`${textClasses} ${
          type === "secondary" ? "text-primary" : "text-white"
        }`}
      >
        {label.toUpperCase()}
      </span>
    </button>
  );
}
