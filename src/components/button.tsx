import { cva } from 'class-variance-authority';
import { PropsWithChildren } from 'react';

type ButtonProps = {
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  color?: 'red' | 'green';
  variant?: 'primary' | 'link';
};

const ButtonVariantGenerator = cva('font-bold relative', {
  variants: {
    variant: {
      primary: [
        'before:absolute before:-inset-1.5 before:-z-10 before:rounded',
        'before:bg-[--base] hover:before:bg-[--hover] active:before:bg-[--active]',
      ],
      link: 'enabled:border-none enabled:text-[--base] enabled:hover:text-[--hover] enabled:active:text-[--active] hover:underline',
    },
    color: {
      red: '[--base:#ef4444] [--hover:#dc2626] [--active:#b91c1c]',
      green: '[--base:#4ade80] [--hover:#22c55e] [--active:#16a34a]',
    },
  },
  defaultVariants: {
    variant: 'primary',
    color: 'green',
  },
});

const Button = (props: PropsWithChildren<ButtonProps>) => {
  const { children, onClick, type = 'button' } = props;
  return (
    <button
      onClick={onClick}
      type={type}
      className={ButtonVariantGenerator(props)}
    >
      {children}
    </button>
  );
};

export { Button };
