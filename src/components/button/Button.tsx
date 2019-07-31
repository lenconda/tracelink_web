import React from 'react';
import Spinner from '../spinner/Spinner';

interface ButtonProps {
  size?: 'default' | 'big' | 'small' | 'mini';
  type?:
  | 'default'
  | 'primary'
  | 'success'
  | 'warning'
  | 'danger';
  border?: 'default' | 'circular';
  width?: 'auto' | 'fixed';
  loading?: boolean;
  ghost?: boolean;
  disabled?: boolean;
  className?: string;
  shadow?: boolean;
  children?: React.ReactNode;
  onClick?: () => any;
}

const Button = ({
  type = 'default',
  className = '',
  border = 'default',
  ghost = false,
  loading = false,
  shadow = false,
  size = 'default',
  width = 'fixed',
  ...props
}: ButtonProps) => {
  const classString = `zi-btn ${className} 
  ${border === 'circular' ? 'circular' : ''}
  ${size !== 'default' ? size : ''}
  ${props.disabled && 'disabled'}
  ${width === 'auto' ? 'auto' : ''}
  ${loading
    ? 'loading'
    : `${shadow ? 'shadow' : ''}
      ${(border !== 'circular') ? type : ''}
      ${ghost ? 'ghost' : ''}`}`;

  return (
    <button className={classString} disabled={loading} onClick={props.onClick} {...props}>
      {
        loading ? <Spinner /> : props.children
      }
    </button>
  );
};

export default Button;
