import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { AppContainer } from 'react-hot-loader';
import App from './containers/app';
import ErrorBoundary from './components/errorboundary';
import store, { history } from './store';
import 'babel-polyfill';

export const renderApp = Component => {
	render(
		<AppContainer>
			<Provider store={ store }>
				<ConnectedRouter history={ history }>
					<ErrorBoundary>
						<App />
					</ErrorBoundary>
				</ConnectedRouter>
			</Provider>
		</AppContainer>
		,
		document.getElementById( 'root' )
	);
}

renderApp( App );

if ( module.hot ) {
	module.hot.accept( () => { renderApp( App ) } );
}

