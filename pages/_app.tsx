import type { AppProps } from 'next/app';
import { Footer, Navigation } from '../components';
import { Provider, store } from '../redux';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<Provider store={store}>
			<Component props={pageProps} />
		</Provider>
	);
}
