let navIsOpen = false; // Mobile nav is closed when page opens
let capstoneIsFlipped = false; // Capstone card is front-facing when page opens
let activeArticleId = ''; // Currently active article ID

/**
 * jQuery function that checks if an element is fully within the viewable window.
 */
$.fn.isFullyInViewport = function () {
  const elementTop = $(this).offset().top;
  const elementBottom = elementTop + $(this).outerHeight();

  const viewportTop = $(window).scrollTop();
  const viewportBottom = viewportTop + $(window).height();

  return elementTop > viewportTop && elementBottom < viewportBottom;
};

/**
 * On clicking the #dropdown-nav-btn, the mobile menu is either opened or closed.
 * On clicking the .nav__link, the menu is closed.
 */
const handleNavButtonClick = (event) => {
  if ($('#dropdown-nav-btn').css('display') === 'none') {
    return;
  }

  $('.nav__list').toggleClass('nav__list--shown');
  $('#dropdown-nav-btn')
    .blur()
    .toggleClass('nav__btn--open');

  if (navIsOpen) {
    $('#dropdown-nav-btn').attr('aria-expanded', 'false');
  } else {
    $('#dropdown-nav-btn').attr('aria-expanded', 'true');
  }

  navIsOpen = !navIsOpen;
}

/**
 * On clicking the #flip-btn, the capstone card will flip to either the front
 * or back.
 */
const handleFlipCapstoneCard = (event) => {
  $('#flip-btn').blur();

  if (capstoneIsFlipped) {
    $('.capstone__card--front').attr('aria-hidden', 'false');
    $('.capstone__card--back').attr('aria-hidden', 'true');

    $('.capstone__card--front').fadeIn(500);
    $('.capstone__card--back').fadeOut(500);
    $('#flip-btn').attr('aria-label', 'Flip capstone card to back');
  } else {
    $('.capstone__card--front').attr('aria-hidden', 'true');
    $('.capstone__card--back').attr('aria-hidden', 'false');

    $('.capstone__card--front').fadeOut(500);
    $('.capstone__card--back')
      .css('display', 'flex')
      .hide()
      .fadeIn(500);
    $('#flip-btn').attr('aria-label', 'Flip capstone card to front');
  }

  capstoneIsFlipped = !capstoneIsFlipped;
}

/**
 * When scrolling, highlight the nav link depending on where the user currently
 * is.
 */
const handleScroll = (event) => {
  let linkIdToActivate = activeArticleId;
  $('.site-article').each(function() {
    if (
      $(this).offset().top - $(window).scrollTop() <= 120 ||
      $(this).isFullyInViewport()
    ) {
      linkIdToActivate = $(this).attr('id');
    }
  });

  // Highlight the corresponding nav link if it isn't already active
  if (linkIdToActivate !== activeArticleId) {
    $(`.nav__link[href="#${activeArticleId}"]`).removeClass('nav__link--active');
    $(`.nav__link[href="#${linkIdToActivate}"]`).addClass('nav__link--active');
    activeArticleId = linkIdToActivate;
  }
}

/**
 * When mobile nav is open, any click outside closes the nav.
 * 
 * @param {Event} event
 */
const handleClickOutsideDropdown = (event) => {
  if (!navIsOpen) {
    return;
  }

  if ($('#site-nav').has(event.target).length < 1) {
    handleNavButtonClick(event);
  }
}

$(document).ready(() => {
  $('#dropdown-nav-btn').on('click', handleNavButtonClick);
  $('.nav__link').on('click', handleNavButtonClick);
  $('#flip-btn').on('click', handleFlipCapstoneCard);
  $(document).on('scroll', handleScroll);
  $(document).on('mousedown', handleClickOutsideDropdown);
});
