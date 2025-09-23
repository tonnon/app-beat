import * as React from 'react';
import './button.scss';
import { Button as RadixButton } from '@radix-ui/themes';

export interface ButtonProps extends React.ComponentProps<typeof RadixButton> {
  text: string;
  iconRight?: React.ReactNode;
}

export default function Button({
  text,
  iconRight,
  className,
  ...props
}: ButtonProps) {
  return (
    <RadixButton
      className={['primaryButton', className].filter(Boolean).join(' ')}
      {...props}
    >
      <span className="primaryButtonContent">{text}</span>
      {iconRight && (
        <span className="primaryButtonIconRight">{iconRight}</span>
      )}
    </RadixButton>
  );
}
