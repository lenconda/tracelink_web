import React from 'react';
import './Loading.scss';

interface LoadingProps {
  indicator?: React.ReactNode | string;
}

const Loading = ({
  indicator
}: LoadingProps) => {
  return (
    <div className="loading-container">
      {indicator || 'Loading...'}
    </div>
  );
};

export default Loading;
