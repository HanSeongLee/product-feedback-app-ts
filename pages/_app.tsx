import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { useCreateStore, Provider } from 'lib/store';

function MyApp({ Component, pageProps }: AppProps) {
  // @ts-ignore
  const createStore = useCreateStore(pageProps.initialZustandState);
  return (
      <Provider createStore={createStore}>
        <Component {...pageProps} />
      </Provider>
  );
}

export default MyApp
