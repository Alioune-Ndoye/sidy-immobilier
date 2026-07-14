import clsx from "clsx";
import { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "outline";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  loading?: boolean;
  icon?: React.ReactNode;
  rounded?: boolean; //control full border-radius
}

export default function Button({
  children,
  variant = "primary",
  loading,
  disabled,
  icon,
  rounded = false,
  className,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;
  return (
    <button
      disabled={disabled}
      {...props}
      className={clsx(
        `
        w-full
        h-12
        font-semibold
        flex
        items-center
        justify-center
        gap-3
        cursor-pointer
        transition
        focus:outline-none
        focus-visible:ring-2
        focus-visible:ring-teal-600
        focus-visible:ring-offset-2
        `,
        rounded ? "rounded-full" : "rounded-lg",
        variant === "primary" &&
          "bg-linear-to-r from-teal-600 to-emerald-600 text-white hover:from-teal-700 hover:to-emerald-700 active:scale-[0.98]",

        variant === "outline" &&
          "border border-gray-300 text-gray-800 bg-white hover:bg-gray-100",

        isDisabled && "opacity-70 cursor-not-allowed",

        className,
      )}
    >
      {icon}
      {loading ? "Chargement..." : children}
    </button>
  );
}
