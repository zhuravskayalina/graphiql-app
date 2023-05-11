import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import Layout from '@/components/Layout/Layout';
import '@/i18n/i18n';
import '@/styles/globals.scss';

const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql',
  cache: new InMemoryCache(),
});

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ApolloProvider client={client}>
      <Layout>
        <ToastContainer autoClose={1000} className="toast-container" />
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
};

export default App;
