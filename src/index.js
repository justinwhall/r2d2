import 'react-hot-loader/patch';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { AppContainer } from 'react-hot-loader';

export const render = Component => {

	ReactDOM.render(
		<AppContainer>
			<Component />
		</AppContainer>,
		document.getElementById('root')
	);
}

render(App);

if ( module.hot ) {
	module.hot.accept(() => { render(App) });
}
