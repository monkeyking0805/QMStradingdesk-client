import i18n from 'i18next'
import en from './lang/en.js'

i18n
  // .use(LanguageDetector)
  .init({
    fallbackLng: 'en',

    ns: ['common'],
    defaultNS: 'common',
    debug: false,
    resources: {
      en: {
        ...en
      }
    },
    interpolation: {
      escapeValue: false, // not needed for react!!
      formatSeparator: ',',
      format: (value, format, lng) => {
        if (format === 'uppercase') return value.toUpperCase()
        return value
      }
    }
  })

export default i18n
