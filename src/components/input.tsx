import { ChangeEventHandler, forwardRef } from 'react';

type InputProps = {
  type?: 'text' | 'number';
  onChange?: ChangeEventHandler<HTMLInputElement>;
  label: string;
  placeholder?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { label, ...rest } = props;
  return (
    <label className="!flex flex-col font-bold !p-0">
      {label}
      <input {...rest} ref={ref}/>
    </label>
  );
});

export { Input };
