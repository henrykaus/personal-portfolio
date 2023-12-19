const contactForm = document.querySelector('#contact-form');
let formIsOpen = false; // Form is closed when page opens
let navIsOpen = false;
let capstoneIsFlipped = false; // Capstone card is front-facing when page opens

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
 * On clicking the #open-form-btn, the form will either appear or
 * disappear depending on the state (formIsOpen) of the form.
 */
const handleFormButtonClick = (event) => {
  if (formIsOpen) {
    // Reset instructions, button text and remove form elements
    $('#contact-instructions').text(
      "If you'd like to be in contact, click 'Open Form'."
    );
    $('#open-form-btn')
      .text('Open Form')
      .removeClass('contact__btn--open')
      .removeAttr('aria-label');
    $('#contact-form').empty().removeClass('contact__form--open');
  } else {
    // Change instructions for submitting a form, change button text, and
    // create the form
    $('#open-form-btn')
      .empty()
      .addClass('contact__btn--open')
      .attr('aria-label', 'close contact form')
      .append(
        $('<i>')
          .addClass('fa-solid fa-xmark fa-lg')
      );
    $('#contact-instructions').text(
      "To get in contact, fill in your info below and click 'Submit'."
    );

    // Add all elements of the form
    $('#contact-form')
      .addClass('contact__form--open')
      .append(
        $('<p>')
          .text('WARNING: This form is purely decorative')
          .addClass('contact__form__warning')
      )
      .append(
        // Name label and input
        $('<div>')
          .addClass('contact__input-container')
          .append(
            $('<label>')
              .attr('for', 'name-input')
              .text('Name')
              .addClass('contact__label')
          )
          .append(
            $('<input>')
              .attr({
                id: 'name-input',
                type: 'text',
                name: 'name',
                required: true,
              })
              .addClass('input-text')
          )
      )
      .append(
        // Email label and input
        $('<div>')
          .addClass('contact__input-container')
          .append(
            $('<label>')
              .attr('for', 'email-input')
              .text('Email')
              .addClass('contact__label')
          )
          .append(
            $('<input>')
              .attr({
                id: 'email-input',
                type: 'email',
                name: 'email',
                required: true,
              })
              .addClass('input-text')
          )
      )
      .append(
        // Reason for contact label and input
        $('<div>')
          .addClass('contact__reason-container')
          .append(
            $('<label>')
              .attr('for', 'reason-input')
              .text('Reason')
              .addClass('contact__label')
          )
          .append(
            $('<textarea>')
              .attr({
                id: 'reason-input',
                rows: '7',
                name: 'reason',
                required: true,
              })
              .addClass('input-reason')
          )
      )
      .append(
        // Submit button
        $('<input>')
          .attr({
            id: 'submit-input',
            type: 'submit',
            value: 'Submit',
          })
          .addClass('input-submit')
      );
  }

  // Change open status of form when button is clicked
  formIsOpen = !formIsOpen;
}

const handleFlipCapstoneCard = (event) => {
  if (capstoneIsFlipped) {
    $('.capstone__card.front').fadeIn(500);
    $('.capstone__card.back').fadeOut(500);
  } else {
    // Shouldn't be using .css
    $('.capstone__card.front').fadeOut(500);
    $('.capstone__card.back')
      .css("display", "flex")
      .hide()
      .fadeIn(500);
  }

  capstoneIsFlipped = !capstoneIsFlipped;
}

/**
 * On form submit, it displays all input information from the form into
 * the console, removed the form, removes the "Close Form" button, and
 * displays a "thank you" message.
 */
const handleContactFormSubmit = (event) => {
  console.group('========= Form Submission =========');
  console.log('Name:', form.elements.name.value);
  console.log('Email:', form.elements.email.value);
  console.log('Reason For Contact:', form.elements.reason.value);
  console.groupEnd();

  $('#contact-form').empty().removeClass('contact__form--open');

  $('#contact-instructions').text(
    'Your request has been submitted, talk to you soon!'
  );
  $('#open-form-btn').remove();

  formIsOpen = false;
  event.preventDefault();
};

$(document).ready(() => {
  $('#dropdown-nav-btn').on('click', handleNavButtonClick);
  $('.nav__link').on('click', handleNavButtonClick);
  $('.capstone__flip-btn').on('click', handleFlipCapstoneCard);
  $('#open-form-btn').on('click', handleFormButtonClick);
  contactForm.onsubmit = handleContactFormSubmit;
});
