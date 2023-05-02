import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styles from '@/styles/Home.module.scss';
import apolloImg from '@/assets/images/apollo.svg';
import graphQlImg from '@/assets/images/graphQL.svg';
import arrowIcon from '@/assets/images/icons/arrow.svg';
import backgroundImg from '@/assets/images/blur.png';

import { clsx } from 'clsx';

import logoImg from '../assets/images/logo-big.svg';
import rssLogo from '@/assets/images/rss-logo.svg';

export default function Home() {
  return (
    <>
      <Head>
        <title>GraphQl App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className={clsx(styles.layout)}
        style={{
          backgroundImage: `url(${backgroundImg.src})`,
          backgroundPosition: 'right',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          overflow: 'visible',
        }}
      >
        <header className={clsx(styles.header)}>
          <div className={clsx(styles.header__container)}>
            <Image src={logoImg} alt="logo" className={clsx(styles.header__logo)} />
          </div>
        </header>
        <main className={clsx(styles.main)}>
          <div className={clsx(styles.container, styles.container__main)}>
            <div className={clsx(styles.main__picture)}>
              <Image
                src={apolloImg}
                alt="apollo"
                className={clsx(styles.main__picture_image)}
                priority
              />
              <Image
                src={graphQlImg}
                alt="graphQl"
                className={clsx(styles.main__picture_image)}
                priority
              />
            </div>
            <p className={clsx(styles.main__description)}>
              Hi there is a description that doesn’t exist yet :)
            </p>
            <button className={clsx(styles.startButton)}>
              <span>Get started</span>
              <Image src={arrowIcon} alt="arrow" className={clsx(styles.startButton_icon)} />
            </button>
          </div>
        </main>
        <footer className={clsx(styles.footer)}>
          <div className={clsx(styles.footer__container)}>
            <Link href="https://rs.school/js/">
              <Image src={rssLogo} alt="rss-logo" className={clsx(styles.footer__logo)} />
            </Link>
            <p className={clsx(styles.footer__copyright)}>Copyright &copy; 2023</p>
          </div>
        </footer>
      </div>
    </>
  );
}
