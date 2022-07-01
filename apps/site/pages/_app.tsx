import { ApolloProvider } from '@apollo/client';
import { client } from '@polar-melon/gateway-client';
import { AppProps } from 'next/app';
import { UserContextProvider } from '../contexts/user.context';
import './styles.css';

function PolarMelonApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <UserContextProvider>
        <main className="app">
          <Component {...pageProps} />
        </main>
      </UserContextProvider>
    </ApolloProvider>
  );
}

export default PolarMelonApp;
