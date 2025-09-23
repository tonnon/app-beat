import React from 'react';
import './button.scss';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  iconRight?: React.ReactNode;
  variant?: 'withIcon';
}

export default function Button({
  text,
  iconRight,
  variant,
  ...props
}: ButtonProps) {
  const className = `primaryButton${variant === 'withIcon' ? ' primaryButtonWithIconRight' : ''}`;

  return (
    <button className={className} {...props}>
      <span className="primaryButtonContent">{text}</span>
      {variant === 'withIcon' && iconRight && (
        <span className="primaryButtonIconRight">{iconRight}</span>
      )}
    </button>
  );
}
