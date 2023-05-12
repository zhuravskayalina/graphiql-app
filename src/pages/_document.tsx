import { Html, Head, Main, NextScript } from 'next/document';
import { GetServerSidePropsContext } from 'next';
import nookies from 'nookies';
import { paths } from '@/enums/routerPaths';

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const cookies = nookies.get(ctx);
  const { token } = cookies;
  if (!token) {
    return {
      props: {},
    };
  }
  return {
    redirect: {
      permanent: false,
      destination: paths.main,
    },
  };
};

const Document = () => {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
