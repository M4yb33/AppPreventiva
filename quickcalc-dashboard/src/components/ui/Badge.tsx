import React from 'react';
import { cn } from '@/lib/utils';
import { AlertStatus } from '@/types/alert';
import { ALERT_STATUS_CONFIG } from '@/lib/constants';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Badge({ children, variant = 'primary', size = 'md', className }: BadgeProps) {
  const variants = {
    primary: 'bg-primary-100 text-primary-800 border-primary-200',
    secondary: 'bg-gray-100 text-gray-800 border-gray-200',
    success: 'bg-success-100 text-success-800 border-success-200',
    danger: 'bg-danger-100 text-danger-800 border-danger-200',
    warning: 'bg-warning-100 text-warning-800 border-warning-200',
    info: 'bg-blue-100 text-blue-800 border-blue-200',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center font-medium rounded-full border',
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  );
}

export interface AlertStatusBadgeProps {
  status: AlertStatus;
  className?: string;
}

export function AlertStatusBadge({ status, className }: AlertStatusBadgeProps) {
  const config = ALERT_STATUS_CONFIG[status];

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-1 rounded-full text-sm font-medium border',
        config.bgColor,
        config.textColor,
        config.borderColor,
        className
      )}
    >
      {config.label}
    </span>
  );
}
