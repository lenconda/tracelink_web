import React from 'react';
import { ToastContainer } from 'react-toastify';
import Button from '../../components/button/Button';
// import http from '../../utils/http';
import './App.scss';

const App = (): JSX.Element => {
  return (
    <>
      <div className="w-100 d-flex flex-column justify-content-center align-items-center">
        <div className="index-input d-flex justify-content-center align-items-center row w-100">
          <div className="box-item-wrapper">
            <input
              type="text"
              placeholder="Email. e.g. user@example.com"
              className="zi-input w-100 box-item"
            />
          </div>
        </div>
        <div className="index-input d-flex justify-content-center align-items-center row w-100">
          <div className="box-item-wrapper">
            <input
              type="text"
              placeholder="Target site. e.g. https://google.com"
              className="zi-input w-100 box-item"
            />
          </div>
        </div>
        <div className="index-input d-flex justify-content-center align-items-center row w-100">
          <div className="box-item-wrapper">
            <textarea
              rows={6}
              placeholder="Comment"
              className="zi-input w-100 box-item"
            />
          </div>
        </div>
        <div className="index-button d-flex justify-content-center align-items-center row w-100">
          <div className="box-item-wrapper">
            <Button
              className="w-100 box-item"
              type="success"
              shadow={true}
            >
                Create
            </Button>
          </div>
        </div>
      </div>
      <ToastContainer position="bottom-right" autoClose={5000} closeOnClick={false} />
    </>
  );
};

export default App;
