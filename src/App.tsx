import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import Button from './components/button/Button';
import './App.scss';

const App = (): JSX.Element => {
  const [trackId, setTrackId] = useState<string>('');

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
                shadow={true}
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
      <ToastContainer />
    </>
  );
};

export default App;
