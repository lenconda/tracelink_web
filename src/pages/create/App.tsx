import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Button from '../../components/button/Button';
import http from '../../utils/http';
import './App.scss';
import validator from 'validator';

const App = (): JSX.Element => {
  const [createButtonLoading, setCreateButtonLoading] = useState<boolean>(false);
  const [inputEmail, setInputEmail] = useState<string>('');
  const [inputTarget, setInputTarget] = useState<string>('');
  const [inputComment, setInputComment] = useState<string>('');

  const create = () => {
    if (!validator.isEmail(inputEmail)) {
      toast.error('Please input a valid Email address!');
      return;
    }

    if (validator.isEmpty(inputEmail) || validator.isEmpty(inputTarget)) {
      toast.error('Please make sure that required fields are filled');
      return;
    }

    setCreateButtonLoading(true);
    http
      .post('/api/links', {
        url: inputTarget,
        email: inputEmail,
        comment: inputComment
      })
      .then(res => {
        setCreateButtonLoading(false);
        if (res.data) {
          setInputEmail('');
          setInputTarget('');
          setInputComment('');
        }
      });
  };

  return (
    <>
      <div className="w-100 d-flex flex-column justify-content-center align-items-center">
        <div className="index-input d-flex justify-content-center align-items-center row w-100">
          <div className="box-item-wrapper">
            <input
              type="text"
              placeholder="Email. e.g. user@example.com"
              className="zi-input w-100 box-item"
              value={inputEmail}
              onChange={event => setInputEmail(event.target.value)}
            />
          </div>
        </div>
        <div className="index-input d-flex justify-content-center align-items-center row w-100">
          <div className="box-item-wrapper">
            <input
              type="text"
              placeholder="Target site. e.g. https://google.com"
              className="zi-input w-100 box-item"
              value={inputTarget}
              onChange={event => setInputTarget(event.target.value)}
            />
          </div>
        </div>
        <div className="index-input d-flex justify-content-center align-items-center row w-100">
          <div className="box-item-wrapper">
            <textarea
              rows={6}
              placeholder="Comment"
              className="zi-input w-100 box-item"
              value={inputComment}
              onChange={event => setInputComment(event.target.value)}
            />
          </div>
        </div>
        <div className="index-button d-flex justify-content-center align-items-center row w-100">
          <div className="box-item-wrapper">
            <Button
              className="w-100 box-item"
              loading={createButtonLoading}
              type="success"
              shadow={true}
              onClick={() => create()}
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
