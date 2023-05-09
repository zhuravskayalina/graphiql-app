import 'react-toastify/dist/ReactToastify.min.css';
import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import Layout from '@/components/Layout/Layout';
import '@/i18n/i18n';
import { ToastContainer } from 'react-toastify';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Layout>
      <ToastContainer autoClose={1000} className="toast-container" />
      <Component {...pageProps} />
    </Layout>
  );
};

export default App;
