$( '#contact-form' ).submit(function( event ) {
  myValidate($(this)[0].name);
  myValidate($(this)[0].email);
  myValidate($(this)[0].message);

  var myForm = $(this).closest('#contact-form');

  $.ajax({
    type: $(this).attr('method'),
    url: $(this).attr('action'),
    data: $(this).serialize(),
    success: function(response, textStatus) {
      if (response === 'OK') {
        $(myForm).find('input:not("#submit-feedback")').val('');
        $(myForm).find('textarea').val('');
        grecaptcha.reset();
        $(myForm).find('.messages').text('Thank you! Your message is sent. We will contact you soon.');
      } else {
        $(myForm).find('.messages').text('Please enter all rows!');
      }
    }
  });
  event.preventDefault();
});

document.forms[0].name.addEventListener('keyup', function(e) {
  myValidate(e.target);
}, true);

document.forms[0].email.addEventListener('keyup', function(e) {
  myValidate(e.target);
}, true);

document.forms[0].message.addEventListener('keyup', function(e) {
  myValidate(e.target);
}, true);

function myValidate(element) {
  if (element.value.trim() !== '') {
    element.classList.remove('tm-form__control_error');
  } else {
    element.classList.add('tm-form__control_error');
  }
}
