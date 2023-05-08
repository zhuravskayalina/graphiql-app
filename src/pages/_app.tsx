import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import Layout from '@/components/Layout/Layout';
import '@/i18n/i18n';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Layout>
      <ToastContainer autoClose={1000} />
      <Component {...pageProps} />
    </Layout>
  );
};

export default App;
