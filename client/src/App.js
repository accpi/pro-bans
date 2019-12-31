import React from 'react';
import './App.css';

import Header from './layout/header';
import Home from './pages/index';

function App(props) {
  return (
		<div style={{ width:"80%", margin: "auto" }}>
			<Header />
			<Home />
		</div>
  );
}

export default App;
