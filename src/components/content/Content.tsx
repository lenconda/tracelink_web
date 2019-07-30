import React from 'react';
import Loading from '../loading/Loading';
import Spinner from '../spinner/Spinner';

interface ContentProps {
  className?: string;
  loading?: boolean;
  children?: React.ReactNode;
}

const Content = ({
  className = '',
  loading = false,
  children
}: ContentProps): JSX.Element => (
  <div className={className}>
    {
      loading
        ? <Loading indicator={<Spinner />} />
        : children
    }
  </div>
);

export default Content;
