import { useTranslations } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Layout from 'components/Layout/Layout';
import Notice from 'components/Notice/Notice';
import Banner from 'components/Banner/Banner';
import OptionsBar from 'components/OptionsBar/OptionsBar';
import Races from 'components/Races/Races';
import RaceSchemas from 'components/RaceSchemas/RaceSchemas';
import i18nConfig from '../../i18nConfig.js';
import { getCurrentYear, getSiteKey } from 'lib/site';

export async function generateStaticParams() {
  return [];
}

export default async function Page({ children, params }) {
  const locale = (await params).locale;

  setRequestLocale(locale);

  const currentYear = getCurrentYear();
  const siteKey = getSiteKey();
  const year = require(
    `../../../_db/${siteKey}/${currentYear}.json`,
  );

  return (
    <>
      <Banner />
      <Layout showCTABar={true} year={currentYear}>
        <OptionsBar pickerShowing={false} />
        <Notice />
        <Races year={currentYear} races={year.races} />
      </Layout>
    </>
  );
}

export const revalidate = 3600;
