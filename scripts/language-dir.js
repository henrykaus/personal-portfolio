/**
 * This file should run prior to the page loading to assign a language direction
 * without a flashing page jump.
 */

const RTL_LANGUAGES = ['ar', 'fa', 'he', 'iw', 'kd', 'pk', 'ps', 'ug', 'ur', 'yi'];

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
  const htmlLang = document.querySelector('html').lang;
  const dir = getLangDirection(htmlLang);

  document.querySelector('html').setAttribute('dir', dir);
}

/**
 * Function called when the html attributes change and sets the language
 * direction as needed.
 * 
 * @param {MutationRecord[]} mutationsList 
 */
const langMutationCallback = (mutationsList) => {
  for (const mutation of mutationsList) {
    if (mutation.type === 'attributes' && mutation.attributeName === 'lang') {
      setLangDirection();
      break;
    }
  }
}

// ACTIONS THAT SHOULD HAPPEN PRIOR TO DOCUMENT READY
setLangDirection();

const langObserver = new MutationObserver(langMutationCallback)
langObserver.observe(document.querySelector('html'), { attributes: true });
