import { FC, PropsWithChildren } from 'react';
import Head from 'next/head';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import styles from './Layout.module.scss';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/services/authService';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const Layout: FC<PropsWithChildren> = ({ children }) => {
  const [user] = useAuthState(auth);

  return (
    <>
      <Head>
        <title>GraphiQL App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header isLoggedIn={Boolean(user)} />
      <ToastContainer />
      <main className={styles.main}>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
