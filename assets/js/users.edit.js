$(function() {
  $('.js-user-edit-form').submit(function(event) {
    event.preventDefault();
    $.ajax({
      type: "PUT",
      url: $('.js-user-edit-form').attr('action'),
      data: $('.js-user-edit-form').serialize()
    })
    .done(function(data) {
      window.location.href = "/user";
    })
    .error(function() {
      alert("Oops! Something went wrong.");
    });
    return false;
  })
});
