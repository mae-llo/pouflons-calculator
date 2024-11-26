import { ChangeEventHandler } from 'react';

type CheckboxProps = {
  onChange?: ChangeEventHandler<HTMLInputElement>;
  label: string;
  checked?: boolean;
};

const Checkbox = (props: CheckboxProps) => {
  const { label, ...rest } = props;
  return (
    <label className="!flex gap-2 font-bold">
      <input type="checkbox" {...rest} />
      {label}
    </label>
  );
};

export { Checkbox };
