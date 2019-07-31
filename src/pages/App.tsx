import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import Button from '../components/button/Button';
import http from '../utils/http';
import './App.scss';

const App = (): JSX.Element => {
  const [trackId, setTrackId] = useState<string>('');
  const [continueButtonLoading, setContinueButtonLoading] = useState<boolean>(false);

  const fetch = (trackId: string) => {
    setContinueButtonLoading(true);
    http
      .get(`/api/links/${trackId}`)
      .then(res => {
        setContinueButtonLoading(false);
        if (res.data) { window.location.href = `/records?trackId=${trackId}` }
      });
  };

  return (
    <>
      <div className="container-fluid h-100 d-flex justify-content-center align-items-center">
        <div className="w-100 d-flex flex-column justify-content-center align-items-center">
          <img className="index-logo" src="/assets/img/logo.svg" alt="site-logo" />
          <div className="index-input d-flex justify-content-center align-items-center row w-100">
            <div className="box-item-wrapper">
              <input
                type="text"
                placeholder="Track ID. e.g. 44cb83fa3fff4ff79563aa7e2522b287"
                className="zi-input w-100 box-item"
                onChange={event => setTrackId(event.target.value)}
              />
            </div>
          </div>
          <div className="index-button d-flex justify-content-center align-items-center row w-100">
            <div className="box-item-wrapper">
              <Button
                className="w-100 box-item"
                type="primary"
                disabled={!trackId}
                loading={continueButtonLoading}
                shadow={true}
                onClick={() => { fetch(trackId) }}
              >
                Continue
              </Button>
            </div>
          </div>
          <div className="index-button d-flex justify-content-center align-items-center row w-100">
            <div className="box-item-wrapper">
              <Button
                className="w-100 box-item"
                type="success"
                onClick={() => { window.location.href = '/create' }}
                shadow={true}
              >
                Create
              </Button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="bottom-right" autoClose={5000} closeOnClick={false} />
    </>
  );
};

export default App;
