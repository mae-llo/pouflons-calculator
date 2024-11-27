import { ChangeEventHandler, forwardRef } from 'react';

type CheckboxProps = {
  onChange?: ChangeEventHandler<HTMLInputElement>;
  label: string;
  checked?: boolean;
};

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => {
  const { label, ...rest } = props;
  return (
    <label className="!flex gap-2 font-bold">
      <input type="checkbox" {...rest} ref={ref}/>
      {label}
    </label>
  );
});

export { Checkbox };
