import { ChangeEventHandler, PropsWithChildren, forwardRef } from 'react';

type SelectProps = {
  onChange?: ChangeEventHandler<HTMLSelectElement>;
  label: string;
};

const Select = forwardRef<HTMLSelectElement, PropsWithChildren<SelectProps>>((props, ref) => {
  const { label, children, ...rest } = props;
  return (
    <label className="!flex flex-col font-bold">
      {label}
      <select {...rest}>{children}</select>
    </label>
  );
});

export { Select };
