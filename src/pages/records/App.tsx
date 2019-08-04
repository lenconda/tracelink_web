import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import http from '../../utils/http';
import parser from 'path-parser';
import LoadMore from '../../components/load_more/LoadMore';
import Content from '../../components/content/Content';
import List from '../../components/list/List';
import RecordItem from '../../components/record_item/RecordItem';
import './App.scss';

interface Record {
  uuid: string;
  belongs: string;
  ip: string;
  country: string;
  device: string;
  createTime: number;
}

const App = (): JSX.Element => {
  const [recordsLoading, setRecordsLoading] = useState<boolean>(false);
  const [moreLoading, setMoreLoading] = useState<boolean>(false);
  const [records, setRecords] = useState<Record[]>([]);
  const [count, setCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const pathScheme = parser.createPath('/records/:id');
  const parsedPathObject: any = pathScheme.partialTest(window.location.pathname);
  const trackId = (parsedPathObject && parsedPathObject.id) || undefined;

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

  useEffect(() => {
    setRecordsLoading(true);
    fetchRecords();
    // eslint-disable-nextline
  }, []);

  useEffect(() => {
    setMoreLoading(true);
    fetchRecords();
    // eslint-disable-nextline
  }, [currentPage]);

  const listItemRender = (index: number, item: Record) => (
    <RecordItem key={index} recordId={item.uuid} ip={item.ip} time={item.createTime} />
  );

  return (
    <>
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
      <ToastContainer position="bottom-right" autoClose={5000} closeOnClick={false} />
    </>
  );
};

export default App;
