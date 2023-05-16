import type { AppContext, AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import { appWithTranslation } from 'next-i18next';
import nookies from 'nookies';
import Layout from '@/components/Layout/Layout';
import { AuthProvider } from '@/contexts/authContext';
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

App.getInitialProps = async (appContext: AppContext) => {
  const cookies = nookies.get(appContext.ctx);
  const { lang } = cookies;
  const Location = lang ? `${lang}/not-found` : '/not-found';
  if (appContext.ctx.res?.statusCode === 404) {
    appContext.ctx.res.writeHead(302, { Location });
    appContext.ctx.res.end();
  }
  return {};
};

export default appWithTranslation(App);
