import React from 'react';
import './App.scss';

export interface Props {}

const App = (props: Props): JSX.Element => {
	return (
		<div>
			<h1 className='title'>Index Page</h1>
		</div>
	);
};

export default App;
