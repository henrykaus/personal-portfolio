/**
 * This file should run prior to the page loading to assign a language direction
 * without a flashing page jump.
 */

const RTL_LANGUAGES = ['ar', 'fa', 'he', 'iw', 'kd', 'pk', 'ps', 'ug', 'ur', 'yi'];

/**
 * Set the <html> dir attribute based on the browser language.
 */
const setLangDirection = (event) => {
  const lang = window.navigator.language;
  const langAbbrev = lang.split('-', 1).at(0).toLowerCase();

  const langDir = RTL_LANGUAGES.includes(langAbbrev) ? 'rtl' : 'ltr';
  document.querySelector('html').setAttribute('dir', langDir);
}

// ACTIONS THAT SHOULD HAPPEN PRIOR TO DOCUMENT READY
setLangDirection();
window.addEventListener('languagechange', setLangDirection);
