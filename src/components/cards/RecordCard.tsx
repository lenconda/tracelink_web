import React from 'react';

export interface Schema {
  key: string;
  title?: string;
  render?: (data: any) => React.ReactNode | string | any;
}

interface RecordCardProps {
  title?: string;
  schema?: Schema[];
  data?: any;
}

const RecordCard = ({
  title = '',
  schema,
  data
}: RecordCardProps) => {
  return (
    <div className="zi-card">
      {
        title && <h4>{title}</h4>
      }
      <div className="card-body">
        {
          schema
            ? schema.map((value, index) => {
              return (
                data[value.key]
                  ? <div className="item">
                    <div className="title">{value.title}</div>
                    {
                      value.render
                        ? value.render(data[value.key])
                        : <div className="data">{data[value.key]}</div>
                    }
                  </div>
                  : null
              );
            })
            : null
        }
      </div>
    </div>
  );
};

export default RecordCard;
