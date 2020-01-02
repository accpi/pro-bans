import React from 'react';
import './App.css';

import Header from './layout/header';
import Home from './pages/index';

import style from './styling/poho.module.css'

function App(props) {
  return (
		<div className={ style.container }>
			<Header />
			<div className={ style.container } style={{ textAlign: 'center' }}>
				<Home />
			</div>
		</div>
  );
}

export default App;
