import * as React from 'react';
import './button.scss';
import { Button as RadixButton } from '@radix-ui/themes';

export interface ButtonProps extends Omit<React.ComponentProps<typeof RadixButton>, 'size' | 'variant'> {
  text: string;
  iconRight?: React.ReactNode;
  buttonSize?: 'xs' | 'sm' | 'md' | 'lg';
}

export default function Button({
  text,
  iconRight,
  className,
  buttonSize = 'md',
  ...props
}: ButtonProps) {
  const sizeClass = `solidButton--${buttonSize}`;
  
  return (
    <RadixButton
      className={[className, 'solidButton', sizeClass].filter(Boolean).join(' ')}
      {...props}
    >
      <span className="solidButtonContent">{text}</span>
      {iconRight && (
        <span className="solidButtonIconRight">{iconRight}</span>
      )}
    </RadixButton>
  );
}
