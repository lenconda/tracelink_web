import React from 'react';
import './Card.scss';
import Loading from '../loading/Loading';
import Spinner from '../spinner/Spinner';

export interface Schema {
  key: string;
  title?: string;
  render?: (text: any, data: any) => React.ReactNode | string | any;
}

interface RecordCardProps {
  title?: string;
  schema?: Schema[];
  loading?: boolean;
  footer?: React.ReactNode;
  extra?: React.ReactNode;
  data?: any;
}

const RecordCard = ({
  title = '',
  loading = false,
  schema,
  data,
  ...props
}: RecordCardProps) => {
  return (
    <div className="zi-card">
      {
        loading
          ? <Loading indicator={<Spinner />} />
          : <>
            {
              title && (
                <div className="header">
                  <h4 className="text-truncate">{title}</h4>
                  {
                    props.extra && (
                      <div className="extra">{props.extra}</div>
                    )
                  }
                </div>
              )
            }
            <div className="body">
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
            {
              props.footer && props.footer
            }
          </>
      }

    </div>
  );
};

export default RecordCard;
