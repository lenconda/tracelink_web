import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import http from '../../utils/http';
import Card, { Schema } from '../../components/card/Card';
import LoadMore from '../../components/load_more/LoadMore';
import Content from '../../components/content/Content';
import List from '../../components/list/List';
import RecordItem from '../../components/record_item/RecordItem';
import qs from 'query-string';
import './App.scss';

interface Record {
  uuid: string;
  belongs: string;
  ip: string;
  country: string;
  device: string;
  createTime: number;
}

interface LinkInfo {
  originalUrl: string;
  shorternUrl: string;
  comment: string;
  qrCode: string;
  createTime: number;
}

const App = (): JSX.Element => {
  const [recordsLoading, setRecordsLoading] = useState<boolean>(false);
  const [linkInfoLoading, setLinkInfoLoading] = useState<boolean>(false);
  const [moreLoading, setMoreLoading] = useState<boolean>(false);
  const [records, setRecords] = useState<Record[]>([]);
  const [count, setCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [linkInfo, setLinkInfo] = useState<Partial<LinkInfo>>({});

  const trackId = JSON.parse(JSON.stringify(qs.parse(window.location.search))).trackId || undefined;

  const fetchRecords = () => {
    http
      .get(`/api/record/${trackId}?page=${currentPage}`)
      .then(res => {
        setRecordsLoading(false);
        setMoreLoading(false);
        if (res.data) {
          setCount(res.data.data.count);
          setRecords(records.concat(res.data.data.items));
        }
      });
  };

  const fetchLinkInfo = () => {
    http
      .get(`/api/links/${trackId}`)
      .then(res => {
        setLinkInfoLoading(false);
        if (res.data) {
          setLinkInfo(res.data.data);
        }
      });
  };

  useEffect(() => {
    setRecordsLoading(true);
    setLinkInfoLoading(true);

    fetchRecords();
    fetchLinkInfo();
    // eslint-disable-nextline
  }, []);

  useEffect(() => {
    setMoreLoading(true);
    fetchRecords();
    // eslint-disable-nextline
  }, [currentPage]);

  const schema: Schema[] = [
    {
      key: 'createTime',
      title: 'Create Time',
      render: (text: number) => <span>{new Date(text).toUTCString()}</span>
    },
    {
      key: 'originalUrl',
      title: 'Target URL'
    },
    {
      key: 'shorternUrl',
      title: 'Track URL'
    },
    {
      key: 'comment',
      title: 'Comment'
    },
    {
      key: 'qrCode',
      title: 'QR Code',
      render: (text: string) => <img src={text} alt={text} width="100" />
    }
  ];

  const listItemRender = (index: number, item: Record) => (
    <RecordItem key={index} recordId={item.uuid} ip={item.ip} time={item.createTime} />
  );

  return (
    <>
      <section className="container-fluid">
        <div className="row d-flex justify-content-center">
          <div className="col-12 col-sm-12 col-md-10 col-lg-8 col-xl-8">
            <div className="container-fluid records-container">
              <div className="row">
                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-5">
                  <Card className="info" title={trackId} schema={schema} data={linkInfo} loading={linkInfoLoading} />
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-7">
                  <Content loading={recordsLoading}>
                    <List render={listItemRender} data={records} />
                  </Content>
                  <LoadMore
                    cursor={currentPage}
                    className="more"
                    total={count}
                    size={10}
                    loading={moreLoading}
                    onMore={() => setCurrentPage(currentPage + 1)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer position="bottom-right" autoClose={5000} closeOnClick={false} />
    </>
  );
};

export default App;
