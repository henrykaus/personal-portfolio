let navIsOpen = false; // Mobile nav is closed when page opens
let capstoneIsFlipped = false; // Capstone card is front-facing when page opens

/**
 * On clicking the #dropdown-nav-btn, the mobile menu is either opened or closed.
 * On clicking the .nav__link, the menu is closed.
 */
const handleNavButtonClick = (event) => {
  if (navIsOpen) {
    $('#dropdown-nav-btn')
      .toggleClass('open')
      .attr('aria-expanded', 'false');
  } else {
    $('#dropdown-nav-btn')
      .toggleClass('open')
      .attr('aria-expanded', 'true');
  }

  $('.nav__list').toggleClass('nav__list--shown');
  navIsOpen = !navIsOpen;
}

/**
 * On clicking the #flip-btn, the capstone card will flip to either the front
 * or back.
 */
const handleFlipCapstoneCard = (event) => {
  if (capstoneIsFlipped) {
    $('.capstone__card--front').fadeIn(500);
    $('.capstone__card--back').fadeOut(500);
  } else {
    $('.capstone__card--front').fadeOut(500);
    $('.capstone__card--back')
      .css('display', 'flex')
      .hide()
      .fadeIn(500);
  }

  capstoneIsFlipped = !capstoneIsFlipped;
}

$(document).ready(() => {
  $('#dropdown-nav-btn').on('click', handleNavButtonClick);
  $('.nav__link').on('click', handleNavButtonClick);
  $('#flip-btn').on('click', handleFlipCapstoneCard);
});
