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
  const sizeClass = `solid-button-${buttonSize}`;
  
  return (
    <RadixButton
      className={[className, 'solid-button', sizeClass].filter(Boolean).join(' ')}
      {...props}
    >
      <span className="solid-button-content">{text}</span>
      {iconRight && (
        <span className="solid-button-icon-right">{iconRight}</span>
      )}
    </RadixButton>
  );
}
