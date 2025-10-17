import type { ReactNode } from 'react';
import { AlertCircleIcon } from '@/components/icons/Icons';
import './warning.scss';

type WarningVariant = 'error' | 'success';

export interface WarningProps {
  readonly variant?: WarningVariant;
  readonly message: ReactNode;
  readonly className?: string;
}

export default function Warning({ variant = 'error', message, className }: WarningProps) {
  const classes = `warning warning-${variant}${className ? ` ${className}` : ''}`;

  return (
    <div className={classes} role="alert">
      <AlertCircleIcon className="warning-icon" size={20} />
      <p className="warning-message">{message}</p>
    </div>
  );
}
