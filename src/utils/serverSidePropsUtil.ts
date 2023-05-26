import { GetServerSidePropsContext } from 'next';
import nookies from 'nookies';
import { paths } from '@/enums/routerPaths';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18NextConfig from './../../next-i18next.config.js';

export const getMainPageServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const cookies = nookies.get(ctx);
  const { token, lang } = cookies;
  if (!token) {
    const path = lang ? `/${lang}${paths.welcome}` : `${paths.welcome}`;
    return {
      redirect: {
        permanent: false,
        destination: path,
      },
      props: {
        ...(await serverSideTranslations(
          lang || ctx.locale || 'en',
          ['common', 'firebaseMessages', 'validationMessages'],
          nextI18NextConfig
        )),
      },
    };
  }
  if (lang && ctx.locale && lang !== ctx.locale) return setLocaleRedirect(ctx, lang);
  return {
    props: {
      ...(await serverSideTranslations(
        ctx.locale || 'en',
        ['common', 'firebaseMessages', 'validationMessages'],
        nextI18NextConfig
      )),
    },
  };
};

export const getAuthPageServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const cookies = nookies.get(ctx);
  const { token, lang } = cookies;
  if (token) {
    const path = lang ? `/${lang}${paths.main}` : `${paths.main}`;
    return {
      redirect: {
        permanent: false,
        destination: path,
      },
      props: {
        ...(await serverSideTranslations(
          lang || ctx.locale || 'en',
          ['common', 'firebaseMessages', 'validationMessages'],
          nextI18NextConfig
        )),
      },
    };
  }
  const { register } = ctx.query;
  const registerProp = register === 'true' ? 'register' : '';
  if (lang && ctx.locale && lang !== ctx.locale) return setLocaleRedirect(ctx, lang);
  return {
    props: {
      ...(await serverSideTranslations(
        ctx.locale || 'en',
        ['common', 'firebaseMessages', 'validationMessages'],
        nextI18NextConfig
      )),
      registerProp,
    },
  };
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const cookies = nookies.get(ctx);
  const { lang } = cookies;
  if (lang && ctx.locale && lang !== ctx.locale) return setLocaleRedirect(ctx, lang);
  return {
    props: {
      ...(await serverSideTranslations(
        ctx.locale || 'en',
        ['common', 'firebaseMessages', 'validationMessages'],
        nextI18NextConfig
      )),
    },
  };
};

const setLocaleRedirect = async (
  ctx: GetServerSidePropsContext,
  lang: string,
  registerProp?: string
) => {
  const path = `/${lang}${ctx.resolvedUrl}`;
  console.log(ctx.resolvedUrl);
  return {
    redirect: {
      permanent: false,
      destination: path,
    },
    props: {
      ...(await serverSideTranslations(
        lang || ctx.locale || 'en',
        ['common', 'firebaseMessages', 'validationMessages'],
        nextI18NextConfig
      )),
      registerProp,
    },
  };
};
