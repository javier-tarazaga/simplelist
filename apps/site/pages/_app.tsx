import { AppProps } from 'next/app';
import { UserContextProvider } from '../contexts/user.context';
import './styles.css';

function PolarMelonApp({ Component, pageProps }: AppProps) {
  return (
    <UserContextProvider>
      <main className="app">
        <Component {...pageProps} />
      </main>
    </UserContextProvider>
  );
}

export default PolarMelonApp;
