import { Field, Input as HeadlessInput, Label } from "@headlessui/react";
import { type FC, type InputHTMLAttributes, memo } from "react";

interface InputProps {
  label?: string;
}

const Input: FC<InputProps & InputHTMLAttributes<HTMLInputElement>> = ({ label, ...rest }) => {
  return (
    <Field>
      {label && <Label>{label}</Label>}
      <HeadlessInput className="w-full border p-2" {...rest} />
    </Field>
  );
};

export default memo(Input);
