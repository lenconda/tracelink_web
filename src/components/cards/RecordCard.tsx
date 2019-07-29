import React from 'react';
import './RecordCard.scss';

export interface Schema {
  key: string;
  title?: string;
  render?: (text: any, data: any) => React.ReactNode | string | any;
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
        title && <h4 className="text-truncate">{title}</h4>
      }
      <div className="card-body">
        {
          schema && schema.map((value, index) => {
            return (
              data[value.key] && (
                <div className="item" key={index}>
                  <div className="title">{value.title}</div>
                  <div className="data">
                    {
                      value.render
                        ? value.render(data[value.key], data)
                        : data[value.key]
                    }
                  </div>
                </div>
              )
            );
          })
        }
      </div>
    </div>
  );
};

export default RecordCard;
