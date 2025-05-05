import { Field, Input as HeadlessInput, Label } from "@headlessui/react";
import { type FC, type InputHTMLAttributes, memo } from "react";

interface InputProps {
  label?: string;
}

const Input: FC<InputProps & InputHTMLAttributes<HTMLInputElement>> = ({ label, ...rest }) => {
  return (
    <Field>
      {label && <Label>{label}</Label>}
      <HeadlessInput className="w-full p-2 border" {...rest} />
    </Field>
  );
};

export default memo(Input);
