import { GetServerSidePropsContext } from 'next';
import nookies from 'nookies';
import { paths } from '@/enums/routerPaths';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

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
        ...(await serverSideTranslations(lang)),
      },
    };
  }
  if (lang !== ctx.locale) return setLocaleRedirect(ctx, lang);
  return {
    props: {
      ...(await serverSideTranslations(ctx.locale)),
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
        ...(await serverSideTranslations(lang),
        ['common', 'validationMessagesRussian', 'firebaseMessagesRussian']),
      },
    };
  }
  if (lang !== ctx.locale) return setLocaleRedirect(ctx, lang);
  return { props: { ...(await serverSideTranslations(ctx.locale)) } };
};

const setLocaleRedirect = async (ctx: GetServerSidePropsContext, lang: string) => {
  const path = lang ? `/${lang}${ctx.resolvedUrl}` : `${ctx.resolvedUrl}`;
  return {
    redirect: {
      permanent: false,
      destination: path,
    },
    props: {
      ...(await serverSideTranslations(lang)),
    },
  };
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const cookies = nookies.get(ctx);
  const { lang } = cookies;
  if (lang !== ctx.locale) return setLocaleRedirect(ctx, lang);
  return { props: { ...(await serverSideTranslations(ctx.locale)) } };
};
