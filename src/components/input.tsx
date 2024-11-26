import { ChangeEventHandler } from 'react';

type InputProps = {
  type?: 'text' | 'number';
  onChange?: ChangeEventHandler<HTMLInputElement>;
  label: string;
  placeholder?: string;
};

const Input = (props: InputProps) => {
  const { label, ...rest } = props;
  return (
    <label className="!flex flex-col font-bold !p-0">
      {label}
      <input {...rest} />
    </label>
  );
};

export { Input };
