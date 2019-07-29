import React from 'react';
import { ToastContainer } from 'react-toastify';
import RecordCard, { Schema } from './components/cards/RecordCard';

const App = (): JSX.Element => {
  const schema: Schema[] = [
    {
      key: 'name',
      title: 'Name'
    },
    {
      key: 'age',
      title: 'Age',
      render: (text: any, data: any) => <strong>{text}{JSON.stringify(data)}</strong>
    }
  ];

  const data = {
    name: 'Peng Hanlin',
    age: 20
  };

  return (
    <div>
      <RecordCard title="asdasdasd" schema={schema} data={data} extra={<button>Button</button>} />
      <ToastContainer />
    </div>
  );
};

export default App;
