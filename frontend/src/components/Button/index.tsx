import clsx from "clsx";
import { type ButtonHTMLAttributes, type FC, memo } from "react";

interface ButtonProps {
  fullWidth?: boolean;
  className?: string;
}

const Button: FC<ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  fullWidth,
  className,
  ...rest
}) => {
  return (
    <button
      className={clsx(
        fullWidth && "w-full",
        "block cursor-pointer rounded-sm bg-blue-600 px-4 py-2 text-white",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export default memo(Button);
