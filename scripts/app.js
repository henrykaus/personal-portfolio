import State from './state.js';

const state = new State();

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
 * On clicking a .nav__link or outside menu, the menu is closed.
 */
const handleNavButtonClick = (event) => {
  // On non-mobile ignore any function calls
  if ($('#dropdown-nav-btn').css('display') === 'none') {
    return;
  }

  if (!state.navIsOpen) {
    // Open nav
    $('.nav').addClass('nav--shown');
    $('.nav__list').addClass('visible');
    $('#dropdown-nav-btn').attr('aria-expanded', 'true');
  } else {
    // Close nav
    $('.nav').removeClass('nav--shown');

    // Wait for animation (300ms) to settle before removing visibility. The check
    // ensures that at the time the class is ultimately removed, the nav is
    // guarenteed to already be closed
    window.setTimeout(() => {
      if (!state.navIsOpen) {
        $('.nav__list').removeClass('visible');
      }
    }, 300);

    $('#dropdown-nav-btn').attr('aria-expanded', 'false');
  }

  state.navIsOpen = !state.navIsOpen;
}

/**
 * When mobile nav is open, any click outside closes the nav.
 * 
 * @param {Event} event
 */
const handleClickOutsideDropdown = (event) => {
  if (!state.navIsOpen) {
    return;
  }

  if ($('#site-nav').has(event.target).length < 1) {
    handleNavButtonClick(event);
  }
}

/**
 * On clicking the #flip-btn, the capstone card will flip to either the front
 * or back.
 */
const handleFlipCapstoneCard = (event) => {
  if (state.capstoneIsFlipped) {
    $('.capstone__card--front').attr('aria-hidden', 'false');
    $('.capstone__card--back').attr('aria-hidden', 'true');

    $('.capstone__card--front').fadeIn(500);
    $('.capstone__card--back').fadeOut(500);
    $('#flip-btn')
      .attr('aria-label', 'Flip capstone card to back')
      .toggleClass('capstone__flip-btn--flipped');
  } else {
    $('.capstone__card--front').attr('aria-hidden', 'true');
    $('.capstone__card--back').attr('aria-hidden', 'false');

    $('.capstone__card--front').fadeOut(500);
    $('.capstone__card--back')
      .css('display', 'flex')
      .hide()
      .fadeIn(500);
    $('#flip-btn')
      .attr('aria-label', 'Flip capstone card to front')
      .toggleClass('capstone__flip-btn--flipped');
  }

  state.capstoneIsFlipped = !state.capstoneIsFlipped;
}

/**
 * When scrolling, highlight the nav link depending on where the user currently
 * is.
 */
const handleScroll = (event) => {
  let linkIdToActivate = state.activeArticleId;
  $('.site-article').each(function() {
    if (
      $(this).offset().top - $(window).scrollTop() <= 120 ||
      $(this).isFullyInViewport()
    ) {
      linkIdToActivate = $(this).attr('id');
    }
  });

  // Highlight the corresponding nav link if it isn't already active
  if (linkIdToActivate !== state.activeArticleId) {
    $(`.nav__link[href="#${state.activeArticleId}"]`).removeClass('nav__link--active');
    $(`.nav__link[href="#${linkIdToActivate}"]`).addClass('nav__link--active');
    state.activeArticleId = linkIdToActivate;
  }
}

// ACTIONS THAT SHOULD HAPPEN AFTER DOCUMENT READY
$(document).ready(() => {
  $('#dropdown-nav-btn').on('click', handleNavButtonClick);
  $('.nav__link').on('click', handleNavButtonClick);
  $(document).on('mousedown', handleClickOutsideDropdown);
  $('#flip-btn').on('click', handleFlipCapstoneCard);
  $(document).on('scroll', handleScroll);
});
