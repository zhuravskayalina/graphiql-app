import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import Layout from '@/components/Layout/Layout';
import { AuthProvider } from '@/contexts/authContext';
import '@/i18n/i18n';
import '@/styles/globals.scss';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <AuthProvider>
      <Layout>
        <ToastContainer autoClose={1000} className="toast-container" />
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
};

export default App;
