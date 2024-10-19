/**
 * This file should run prior to the page loading to assign a language direction
 * without a flashing page jump.
 */

const RTL_LANGUAGES = ['ar', 'fa', 'he', 'iw', 'kd', 'pk', 'ps', 'ug', 'ur', 'yi'];
const htmlElement = document.getElementsByTagName('html').item(0);

/**
 * Gets the language direction given a language code.
 * 
 * @param {string} languageCode 
 * @returns 'rtl' or 'ltr'
 */
const getLangDirection = (languageCode) => {
  const langAbbrev = languageCode.split('-', 1).at(0).toLowerCase();
  return RTL_LANGUAGES.includes(langAbbrev) ? 'rtl' : 'ltr';
}

/**
 * Set the <html> dir attribute based on the translation language.
 */
const setLangDirection = () => {
  const dir = getLangDirection(htmlElement.lang);
  htmlElement.setAttribute('dir', dir);
}

// ACTIONS THAT SHOULD HAPPEN PRIOR TO DOCUMENT READY
setLangDirection();

const langObserver = new MutationObserver(setLangDirection)
langObserver.observe(htmlElement, { attributeFilter: ['lang'] });
