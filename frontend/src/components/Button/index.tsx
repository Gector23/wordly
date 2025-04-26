import clsx from "clsx";
import { ButtonHTMLAttributes, FC, memo } from "react";

interface ButtonProps {
  className?: string;
}

const Button: FC<ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, className, ...rest }) => {
  return (
    <button className={clsx("block cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-sm", className)} {...rest}>
      {children}
    </button>
  );
};

export default memo(Button);