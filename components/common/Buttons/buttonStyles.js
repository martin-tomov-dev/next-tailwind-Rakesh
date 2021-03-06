const base = [
  "w-full",
  "flex",
  "border-[0.5px]",
  "border-primary",
  "rounded-[3px]",
  "px-8",
  "text-center",
  "py-[13px]",
  "mx-auto",
  "tablet:py-[14px]",
  "desktop:py-[20px]",
  "w-[127px]",
  "tablet:w-[144px]",
  "desktop:w-[182px]",
];
export const btnStyles = {
  primary: [
    ...base,
    "text-white",
    "rounded-sm",
    "bg-primary",
    "space-x-3",
    "items-center",
    "transition-colors",
    "duration-150",
  ],
  secondary: [...base, "text-primary", "bg-white"],
  disabled: [...base, "bg-primary/[0.2]", "border-none", "cursor-not-allowed"],
};
