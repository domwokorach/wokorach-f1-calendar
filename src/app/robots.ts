import type { MetadataRoute } from 'next';
import { getSiteKey } from 'lib/site';

export default function robots(): MetadataRoute.Robots {
  const siteKey = getSiteKey();
  const config = require(
    `../../_db/${siteKey}/config.json`,
  );

  return {
    rules: {
      userAgent: '*',
    },
    sitemap: `https://${config.url}/sitemap.xml`,
  };
}
