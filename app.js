$(document).ready(() => {
  let formIsOpen = false; // Form is closed when page opens

  /**
   * FORM: open-form-btn onClick
   * Desc: On clicking the #open-form-btn, the form will either appear or
   *       disappear depending on the state (formIsOpen) of the form.
   */
  $('#open-form-btn').on('click', (event) => {
    if (formIsOpen) {
      // Reset instructions, button text and remove form elements
      $('#contact-instructions').text(
        "If you'd like to be in contact, click 'Open Form'."
      );
      $('#open-form-btn').text('Open Form').removeClass('contact__btn--open');
      $('#contact-form').empty().removeClass('contact__form--open');
    } else {
      // Change instructions for submitting a form, change button text, and
      // create the form
      $('#open-form-btn').text('Close Form').addClass('contact__btn--open');
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
  });

  /**
   * FORM: onSubmit
   * Desc: On form submit, it displays all input information from the form into
   *       the console, removed the form, removes the "Close Form" button, and
   *       displays a "thank you" message.
   */
  const form = document.querySelector('#contact-form');
  form.onsubmit = (event) => {
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
});
