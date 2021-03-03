import { hot } from 'react-hot-loader/root';
import React from 'react';
import { Home } from './components';
import { QueryClient, QueryClientProvider} from 'react-query';
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<Home />
			<ReactQueryDevtools initialIsOpen />
		</QueryClientProvider>
	);
};

export default hot(App);
