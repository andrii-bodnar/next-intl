import otaClient from '@crowdin/ota-client';
import {GetStaticPropsContext} from 'next';
import {useTranslations} from 'next-intl';
import LocaleSwitcher from 'components/LocaleSwitcher';
import PageLayout from 'components/PageLayout';

export default function Index() {
  const t = useTranslations('Index');

  return (
    <PageLayout title={t('title')}>
      <p>{t('description')}</p>
      <LocaleSwitcher />
    </PageLayout>
  );
}

export async function getStaticProps({locale}: GetStaticPropsContext) {
  const client = new otaClient('e979313c34be50eb5c8f997uo3a');

  const messages =
    locale === 'en'
      ? (await import(`../../messages/en.json`)).default
      : await client.getStringsByLocale(locale);

  return {
    props: {
      messages
    }
  };
}
