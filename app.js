$(document).ready(() => {
  const form = document.querySelector('#contact-form');
  let formIsOpen = false;

  /**
   * FORM: open-form-btn onClick
   * Desc: On clicking the #open-form-btn, the form will either appear or
   *       disappear depending on the "state" of the form.
   */
  $('#open-form-btn').on('click', (event) => {
    if (formIsOpen) {
      // Reset instructions, button text and remove form elements
      $('#contact-instructions').html(
        "If you'd like to be in contact, click <b>Open Form</b>."
      );
      $('#open-form-btn').text('Open Form').removeClass('contact__btn--open');
      $('#contact-form').empty().removeClass('contact__form--open');
    } else {
      // Change instructions for submitting a form, change button text, and
      // create the form
      $('#open-form-btn').text('Close Form').addClass('contact__btn--open');
      $('#contact-instructions').html(
        'To get in contact, fill in your info below and click <b>Submit</b>.'
      );

      // Add all elements of the form
      $('#contact-form')
        .addClass('contact__form--open')
        .append(
          $('<div>')
            .append(
              $('<label for="name-input">')
                .text('Name')
                .addClass('contact__label')
            )
            .append(
              $(
                '<input id="name-input" type="text" name="name" required>'
              ).addClass('input-text')
            )
        )
        .append(
          $('<div>')
            .append(
              $('<label for="email-input">')
                .text('Email')
                .addClass('contact__label')
            )
            .append(
              $(
                '<input id="email-input" type="email" name="email" required>'
              ).addClass('input-text')
            )
        )
        .append(
          $('<div>')
            .addClass('contact__reason-container')
            .append(
              $('<label for="reason-input">')
                .text('Reason')
                .addClass('contact__label')
            )
            .append(
              $(
                '<textarea id="reason-input" rows="7" name="reason" required>'
              ).addClass('input-reason')
            )
        )
        .append(
          $('<input id="submit-input" type="submit" value="Submit">').addClass(
            'input-submit'
          )
        );
    }

    // Change open status of form when button is clicked
    formIsOpen = !formIsOpen;
  });

  /**
   * FORM: onSubmit
   * Desc: On form submit, it displays all input information from the form into
   *       the console, removed the form, removes the "Close Form" button, and
   *       displays a "thank you" message.
   */
  form.onsubmit = (event) => {
    console.group('========= Form Submission =========');
    console.log('Name:', form.elements.name.value);
    console.log('Email:', form.elements.email.value);
    console.log('Reason For Contact:', form.elements.reason.value);
    console.groupEnd();
    form.reset();
    event.preventDefault();
    $('#contact-form').empty().removeClass('contact__form--open');
    $('#contact-instructions').text(
      'Your request has been submitted, talk to you soon!'
    );
    $('#open-form-btn').remove();
    formIsOpen = false;
  };
});
