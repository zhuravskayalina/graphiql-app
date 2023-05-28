import { FC, PropsWithChildren } from 'react';
import Head from 'next/head';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import styles from './Layout.module.scss';
import { useRouter } from 'next/router';

const Layout: FC<PropsWithChildren> = ({ children }) => {
  const { pathname } = useRouter();

  return (
    <>
      <Head>
        <title>GraphiQL App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {pathname !== '/404' && <Header />}
      <main className={styles.main}>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
