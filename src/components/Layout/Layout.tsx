import Head from 'next/head';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { LayoutProps } from './types';
import styles from './Layout.module.scss';

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Head>
        <title>GraphiQL App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header isLoggedIn={false} />
      <main className={styles.main}>{children}</main>
      <Footer />
    </>
  );
}
