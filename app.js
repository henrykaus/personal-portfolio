$(document).ready(() => {
  const form = document.querySelector('#contact-form');
  let formIsOpen = false;

  $('#open-form-btn').on('click', (event) => {
    if (formIsOpen) {
      $('#open-form-btn').text('Open Form').removeClass('contact__btn--open');
      $('#contact-instructions').text(
        'If you\'d like to get in contact, click "Open Form".'
      );
      // Delete all elements in form
      $('#contact-form').empty();
    } else {
      $('#open-form-btn').text('Close Form').addClass('contact__btn--open');
      $('#contact-instructions').text(
        'To get in contact, fill out the fields below and click "Submit".'
      );

      // Add all elements of the form
      $('#contact-form')
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
    formIsOpen = !formIsOpen;
  });

  form.onsubmit = (event) => {
    console.group('========= Form Submission =========');
    console.log('Name:', form.elements.name.value);
    console.log('Email:', form.elements.email.value);
    console.log('Reason For Contact:', form.elements.reason.value);
    console.groupEnd();
    form.reset();
    event.preventDefault();
    $('#contact-form').empty();
    $('#contact-instructions').text(
      'Your request has been submitted, talk to you soon!'
    );
    $('#open-form-btn').remove();
    formIsOpen = false;
  };
});
