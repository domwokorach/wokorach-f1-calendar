import { notFound } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';
import Layout from 'components/Layout/Layout';
import Card from 'components/Card/Card';
import Link from 'next/link';
import OptionsBar from 'components/OptionsBar/OptionsBar';
import Races from 'components/Races/Races';
import RaceSchemas from 'components/RaceSchemas/RaceSchemas';
import * as ct from 'countries-and-timezones';
import i18nConfig from '../../../../i18nConfig.js';
import { getCurrentYear, getSiteKey } from 'lib/site';

export interface Props {
  params: { timezone: string; locale: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { timezone, locale } = await params;

  const siteKey = getSiteKey();

  const { locales } = i18nConfig;
  const currentLocale = locale || 'en';

  // Helper function to create language alternates
  const createLanguageAlternates = (path: string = '') => {
    const languages: { [key: string]: string } = {};

    locales.forEach((locale: string) => {
      // For the default locale (assuming it's 'en'), don't add the locale prefix
      const localePath = locale === 'en' ? path : `/${locale}${path}`;
      languages[locale] =
        `https://${config.url}${localePath}/timezone/${timezone}`;
    });

    languages['x-default'] = `https://${config.url}/timezone/${timezone}`;

    return languages;
  };

  const config = require(
  `../../../../../_db/${siteKey}/config.json`,
  );
  const canonicalPath = currentLocale === 'en' ? '' : `/${currentLocale}`;
  const canonical = `https://${config.url}${canonicalPath}/timezone/${timezone}`;

  const t = await getTranslations('All');
  const currentYear = getCurrentYear();

  // Format timezone for display (e.g., "Europe-London" -> "Europe/London")
  const displayTimezone = timezone.replace('-', '/');

  // Check if timezone-specific translations exist, fallback to generic
  const timezoneTitle = t(`${siteKey}.seo.timezoneTitle`, {
    year: currentYear,
    timezone: displayTimezone,
  });
  const timezoneDescription = t(`${siteKey}.seo.timezoneDescription`, {
    year: currentYear,
    timezone: displayTimezone,
  });

  return {
    title: timezoneTitle,
    description: timezoneDescription,
    keywords: t(`${siteKey}.seo.keywords`, {
      year: currentYear,
    }),
    alternates: {
      canonical,
      languages: createLanguageAlternates(),
    },
  };
}

export async function generateStaticParams() {
  const timezoneItems = [];
  let zoneslist = Object.keys(ct.getAllTimezones());

  return timezoneItems;
}

export default async function Timezone({ children, params }) {
  const { locale, timezone } = await params;

  setRequestLocale(locale);

  const t = await getTranslations('All');

  var tz = timezone ? timezone.replace('-', '/') : '';
  var displayTimezone = tz;
  if (tz == 'Europe/Kyiv') {
    tz = 'Europe/Kiev';
  }

  let zoneslist = Object.keys(ct.getAllTimezones());
  if (!zoneslist.includes(tz)) {
    notFound();
  }

  const currentYear = getCurrentYear();
  const currentYearNum = Number(currentYear);
  const siteKey = getSiteKey();
  const config = require(
    `../../../../../_db/${siteKey}/config.json`,
  );
  const data = require(
    `../../../../../_db/${siteKey}/${currentYear}.json`,
  );

  return (
  <Layout showCTABar={true} year={currentYearNum}>
      {data.races && (
    <Races year={currentYearNum} races={data.races} />
      )}
    </Layout>
  );
}
