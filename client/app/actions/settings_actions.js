/* global localStorage */
export const CHANGE_LOCALE = 'CHANGE_LOCALE'

export const changeLocale = (locale) => {
  localStorage.setItem('currentLanguage', locale)
  return (
    {
      type: CHANGE_LOCALE,
      payload: locale
    }
  )
}
