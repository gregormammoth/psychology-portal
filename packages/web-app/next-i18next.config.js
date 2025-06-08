/** @type {import('next-i18next').UserConfig} */
module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ru', 'sr'],
    localeDetection: true,
  },
  defaultNS: 'common',
  localePath: './public/locales',
}; 