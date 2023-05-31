$(document).ready(() => {
  let formIsOpen = false;

  $('#open-form-btn').on('click', (event) => {
    if (formIsOpen) {
      $('#open-form-btn').text('Open Form').removeClass('contact__btn--open');
      // Delete all elements in form
      $('#contact-form').empty();
    } else {
      $('#open-form-btn').text('Close Form').addClass('contact__btn--open');

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

      //Submit not working
      $('#submit-input').on('submit', function (event) {
        console.group('========= Form Submission =========');
        console.log('Name:', $('#name-input').val());
        console.log('Email:', $('#email-input').val());
        console.log('Reason:', $('#reason-input').val());
        console.groupEnd();
        $('#open-form-btn').remove();
        // $('#contact-form').empty();

        // $('#contact-form').append(
        //   $('<p>').text('Successfully submitted form!')
        // );
        event.preventDefault();
        return false;
      });
    }
    formIsOpen = !formIsOpen;
  });
});
