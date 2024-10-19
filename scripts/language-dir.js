/**
 * This file should run prior to the page loading to assign a language direction
 * without a flashing page jump.
 */

const RTL_LANGUAGES = ['ar', 'fa', 'he', 'iw', 'kd', 'pk', 'ps', 'ug', 'ur', 'yi'];

/**
 * Gets the language direction given a language code.
 * 
 * @param {string} language 
 * @returns 'rtl' or 'ltr'
 */
const getLangDirection = (language) => {
  const langAbbrev = language.split('-', 1).at(0).toLowerCase();
  return RTL_LANGUAGES.includes(langAbbrev) ? 'rtl' : 'ltr';
}

/**
 * Set the <html> dir attribute based on the browser or translation language.
 */
const setLangDirection = (event) => {
  const browserLang = window.navigator.language;
  const htmlLang = document.querySelector('html').lang;

  const browserLangDir = getLangDirection(browserLang);
  const htmlLangDir = getLangDirection(htmlLang);

  const dir = (browserLangDir === 'rtl' || htmlLangDir === 'rtl') ? 'rtl' : 'ltr';

  document.querySelector('html').setAttribute('dir', dir);
}

/**
 * Function called when the html attributes change
 * @param {MutationRecord[]} mutationsList 
 */
const langMutationCallback = (mutationsList) => {
  for (const mutation of mutationsList) {
    if (mutation.type === "attributes" && mutation.attributeName === "lang") {
      setLangDirection();
    }
  }
}

// ACTIONS THAT SHOULD HAPPEN PRIOR TO DOCUMENT READY
setLangDirection();
window.addEventListener('languagechange', setLangDirection);

const langObserver = new MutationObserver(langMutationCallback)
langObserver.observe(document.querySelector('html'), { attributes: true });
