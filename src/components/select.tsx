import { ChangeEventHandler, PropsWithChildren } from 'react';

type SelectProps = {
  onChange?: ChangeEventHandler<HTMLSelectElement>;
  label: string;
};

const Select = (props: PropsWithChildren<SelectProps>) => {
  const { label, children, ...rest } = props;
  return (
    <label className="!flex flex-col font-bold">
      {label}
      <select {...rest}>{children}</select>
    </label>
  );
};

export { Select };
