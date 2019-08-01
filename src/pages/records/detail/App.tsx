import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import http from '../../../utils/http';
import Card, { Schema } from '../../../components/card/Card';
import Content from '../../../components/content/Content';
import { empty } from '../../../utils/object';
import qs from 'query-string';
import './App.scss';

interface IPLocation {
  _id: string;
  country: string;
  countryCode: string;
  region: string;
  city: string;
  latitude: string;
  longitude: string;
}

interface Proxy {
  _id: string;
  remoteAddr: string;
  httpVia: string;
  httpXForwardedFor: string;
}

interface SoftwareInfo {
  _id: string;
  name: string;
  version: string;
}

interface HardwareInfo {
  _id: string;
  type: string;
  manufacturer: string;
  model: string;
}

interface BasicInfo {
  _id: string;
  __v: number;
  uuid: string;
  belongs: string;
  ip: string;
  userAgent: string;
  createTime: number;
}

const App = (): JSX.Element => {
  const [recordDetailLoading, setRecordDetailLoading] = useState<boolean>(false);
  const [recordBasicInfo, setRecordBasicInfo] = useState<Partial<BasicInfo>>({});
  const [recordIPLocationInfo, setRecordIPLocationInfo] = useState<Partial<IPLocation>>({});
  const [recordProxyInfo, setRecordProxyInfo] = useState<Partial<Proxy>>({});
  const [recordBrowserInfo, setRecordBrowserInfo] = useState<Partial<SoftwareInfo>>({});
  const [recordEngineInfo, setRecordEngineInfo] = useState<Partial<SoftwareInfo>>({});
  const [recordOSInfo, setRecordOSInfo] = useState<Partial<SoftwareInfo>>({});
  const [recordDeviceInfo, setRecordDeviceInfo] = useState<Partial<HardwareInfo>>({});

  const recordId = JSON.parse(JSON.stringify(qs.parse(window.location.search))).recordId || undefined;

  const fetchRecordDetail = () => {
    http
      .get(`/api/record/detail/${recordId}`)
      .then(res => {
        setRecordDetailLoading(false);
        if (res.data) {
          const {
            uuid,
            belongs,
            ip,
            userAgent,
            createTime
          } = res.data.data;
          setRecordBasicInfo({
            uuid,
            belongs,
            ip,
            userAgent,
            createTime
          });
          setRecordIPLocationInfo(res.data.data.ipLocation);
          setRecordProxyInfo(res.data.data.proxy);
          setRecordBrowserInfo(res.data.data.browser);
          setRecordEngineInfo(res.data.data.engine);
          setRecordOSInfo(res.data.data.os);
          setRecordDeviceInfo(res.data.data.device);
        }
      });
  };

  useEffect(() => {
    setRecordDetailLoading(true);
    fetchRecordDetail();
  }, []);

  const basicInfoSchema: Schema[] = [
    {
      key: 'createTime',
      title: 'Create Time'
    },
    {
      key: 'uuid',
      title: 'Record ID'
    },
    {
      key: 'belongs',
      title: 'Track ID',
      render: (text: string) => <a href={`/records?trackId=${text}`}>{text}</a>
    },
    {
      key: 'ip',
      title: 'IP'
    },
    {
      key: 'userAgent',
      title: 'User Agent',
      render: (text: string) => <code>{text}</code>
    }
  ];

  const proxyInfoSchema: Schema[] = [
    {
      key: 'remoteAddr',
      title: 'REMOTE_ADDR',
      render: (text: any) => text || 'null'
    },
    {
      key: 'httpVia',
      title: 'VIA',
      render: (text: any) => text || 'null'
    },
    {
      key: 'httpXForwardedFor',
      title: 'X_FORWARDED_FOR',
      render: (text: any) => text || 'null'
    }
  ];

  const ipLocationSchema: Schema[] = [
    {
      key: 'country',
      title: 'Country / Area'
    },
    {
      key: 'countryCode',
      title: 'Country Code'
    },
    {
      key: 'region',
      title: 'Region / Province / State'
    },
    {
      key: 'city',
      title: 'City'
    },
    {
      key: 'longitude',
      title: 'Longitude'
    },
    {
      key: 'latitude',
      title: 'Latitude'
    }
  ];

  const softwareSchema: Schema[] = [
    {
      key: 'name',
      title: 'Name'
    },
    {
      key: 'version',
      title: 'Version'
    }
  ];

  const hardwareInfoSchema: Schema[] = [
    {
      key: 'type',
      title: 'Type'
    },
    {
      key: 'model',
      title: 'Model'
    },
    {
      key: 'manufacturer',
      title: 'Manufacturer'
    }
  ];

  return (
    <>
      <section className="container-fluid">
        <div className="row d-flex justify-content-center">
          <div className="col-12 col-sm-12 col-md-10 col-lg-8 col-xl-8">
            <Content loading={recordDetailLoading}>
              <Card title="Basic Information" schema={basicInfoSchema} data={recordBasicInfo} />
              <Card title="Proxy Information" schema={proxyInfoSchema} data={recordProxyInfo} />
              {
                !empty(recordIPLocationInfo) &&
                  <Card title="Geo Location Information" schema={ipLocationSchema} data={recordIPLocationInfo} />
              }
              {
                !empty(recordBrowserInfo) &&
                  <Card title="Browser Information" schema={softwareSchema} data={recordBrowserInfo} />
              }
              {
                !empty(recordEngineInfo) &&
                  <Card title="Engine Information" schema={softwareSchema} data={recordEngineInfo} />
              }
              {
                !empty(recordOSInfo) &&
                  <Card title="Operating System Information" schema={softwareSchema} data={recordOSInfo} />
              }
              {
                !empty(recordDeviceInfo) &&
                  <Card title="Device Information" schema={hardwareInfoSchema} data={recordDeviceInfo} />
              }
            </Content>
          </div>
        </div>
      </section>
      <ToastContainer position="bottom-right" autoClose={5000} closeOnClick={false} />
    </>
  );
};

export default App;
