import React from 'react';
import moment from 'moment';
import Tooltip from '@tippy.js/react';
import './RecordItem.scss';

interface RecordItemProps {
  recordId: string;
  country?: string;
  ip: string;
  time: number;
}

const RecordItem = ({
  recordId,
  ip,
  time,
  ...props
}: RecordItemProps): JSX.Element => (
  <li className="item-content">
    <div className="item-content-container row">
      <div className="ip text-truncate col-xl-6 col-lg-6 col-md-6 col-sm-12">
        <Tooltip content={ip} arrow={true} animation="fade">
          <span>{ip}</span>
        </Tooltip>
      </div>
      <div className="time text-truncate col-xl-6 col-lg-6 col-md-6 col-sm-12">
        <Tooltip content={moment(time).format('YY-MM-DD HH:mm:ss')} arrow={true} animation="fade">
          <span>{moment(time).format('YY-MM-DD HH:mm:ss')}</span>
        </Tooltip>
      </div>
      <div className="col-12">
        {
          props.country && (
            <Tooltip content={props.country} arrow={true} animation="fade">
              <span className="country">
                <i className="fa fa-map-marker"></i>
                &nbsp;
                {props.country}
              </span>
            </Tooltip>
          )
        }
      </div>
    </div>
    <div className="item-content-footer">
      <a className="text-truncate" href={`/records/detail?recordId=${recordId}`}>View detail &rarr;</a>
    </div>
  </li>
);

export default RecordItem;
