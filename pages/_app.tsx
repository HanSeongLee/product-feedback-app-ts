import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { useCreateStore, Provider } from 'lib/store';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';

function MyApp({ Component, pageProps: {
    session, ...pageProps
} }: AppProps<{ session: Session }>) {
  // @ts-ignore
  const createStore = useCreateStore(pageProps.initialZustandState);
    return (
        <SessionProvider session={session}>
            <Provider createStore={createStore}>
                <Component {...pageProps} />
            </Provider>
        </SessionProvider>
    );
}

export default MyApp
