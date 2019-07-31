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
  className?: string;
}

const RecordCard = ({
  title = '',
  loading = false,
  schema,
  data,
  className = '',
  ...props
}: RecordCardProps) => {
  return (
    <div className={`zi-fieldset tl-card ${className}`}>
      {
        loading
          ? <Loading indicator={<Spinner />} />
          : <div className="zi-fieldset-content tl-card-content">
            {
              title && (
                <div className="tl-card-header">
                  <h2 className="text-truncate">{title}</h2>
                  {
                    props.extra && (
                      <div className="extra">{props.extra}</div>
                    )
                  }
                </div>
              )
            }
            <div className="container tl-card-body">
              {
                schema && schema.map((value, index) => {
                  return (
                    data[value.key] && (
                      <div className="row item" key={index}>
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 title">{value.title}</div>
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 data">
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
          </div>
      }
    </div>
  );
};

export default RecordCard;
