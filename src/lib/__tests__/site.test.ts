import { DEFAULT_SITE_KEY, getCurrentYear, getSiteKey } from '../site';

describe('lib/site', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
    delete process.env.NEXT_PUBLIC_SITE_KEY;
    delete process.env.NEXT_PUBLIC_CURRENT_YEAR;
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  test('getSiteKey() returns default when env var is missing', () => {
    expect(getSiteKey()).toBe(DEFAULT_SITE_KEY);
  });

  test('getSiteKey() returns env var when set', () => {
    process.env.NEXT_PUBLIC_SITE_KEY = 'f2';
    expect(getSiteKey()).toBe('f2');
  });

  test('getCurrentYear() returns env var when set', () => {
    process.env.NEXT_PUBLIC_CURRENT_YEAR = '2030';
    expect(getCurrentYear()).toBe('2030');
  });

  test('getCurrentYear() falls back to the current calendar year when env var is missing', () => {
    const year = Number(getCurrentYear());
    expect(Number.isFinite(year)).toBe(true);
    expect(year).toBeGreaterThan(2000);
  });
});
