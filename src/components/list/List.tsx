import React from 'react';
import './List.scss';

interface ListProps {
  className?: string;
  data: any[];
  render: (index: number, item?: any) => JSX.Element;
}

const List = ({
  className = '',
  data = [],
  ...props
}: ListProps): JSX.Element => {
  return (
    <ul className={`tl-list ${className}`}>
      {
        data && data.map((value, index) => props.render(index, value))
      }
    </ul>
  );
};

export default List;
