import type { AppProps } from 'next/app';
import { ErrorBoundary } from 'react-error-boundary';
import { ToastContainer } from 'react-toastify';
import { appWithTranslation } from 'next-i18next';
import Layout from '@/components/Layout/Layout';
import { AuthProvider } from '@/contexts/authContext';
import ErrorFallback from '@/components/ErrorFallback/ErrorFallback';
import '@/styles/globals.scss';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <AuthProvider>
        <Layout>
          <ToastContainer autoClose={1000} className="toast-container" />
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </ErrorBoundary>
  );
};

export default appWithTranslation(App);
