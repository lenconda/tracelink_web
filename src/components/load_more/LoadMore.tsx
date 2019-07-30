import React from 'react';
import Button from '../button/Button';

interface LoadMoreProps {
  text?: string;
  loading?: boolean;
  className?: string;
  total: number;
  size: number;
  cursor: number;
}

const LoadMore = ({
  text = 'More',
  loading = false,
  className = '',
  total = 0,
  size = 10,
  cursor = 1
}: LoadMoreProps): JSX.Element | null => {
  const show = (): boolean => cursor * size <= total;

  return (
    !show
      ? null
      : <div className={className}>
        <div className="zi-more">
          <Button loading={loading} border="circular" size="small" width="auto">
            {text}
            <i className="suffix zi-icon-up"></i>
          </Button>
        </div>
      </div>
  );
};

export default LoadMore;
