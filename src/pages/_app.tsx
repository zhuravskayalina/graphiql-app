import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import Layout from '@/components/Layout/Layout';
import '@/i18n/i18n';
import 'react-toastify/dist/ReactToastify.min.css';
import '@/styles/globals.scss';
import { AuthProvider } from '@/contexts/authContext';

const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql',
  cache: new InMemoryCache(),
});

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <AuthProvider>
      <ApolloProvider client={client}>
        <Layout>
          <ToastContainer autoClose={1000} className="toast-container" />
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </AuthProvider>
  );
};

export default App;
