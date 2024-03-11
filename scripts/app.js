let navIsOpen = false; // Mobile nav is closed when page opens
let capstoneIsFlipped = false; // Capstone card is front-facing when page opens

/**
 * On clicking the #dropdown-nav-btn, the mobile menu is either opened or closed.
 * On clicking the .nav__link, the menu is closed.
 */
const handleNavButtonClick = (event) => {
  if ($('#dropdown-nav-btn').css('display') === 'none') {
    return;
  }

  $('.nav__list').toggleClass('nav__list--shown');
  $('#dropdown-nav-btn').toggleClass('nav__btn--open');

  if (navIsOpen) {
    $('#dropdown-nav-btn')
      .attr('aria-expanded', 'false');
  } else {
    $('#dropdown-nav-btn')
      .attr('aria-expanded', 'true');
  }

  navIsOpen = !navIsOpen;
}

/**
 * On clicking the #flip-btn, the capstone card will flip to either the front
 * or back.
 */
const handleFlipCapstoneCard = (event) => {
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

$(document).ready(() => {
  $('#dropdown-nav-btn').on('click', handleNavButtonClick);
  $('.nav__link').on('click', handleNavButtonClick);
  $('#flip-btn').on('click', handleFlipCapstoneCard);
});
