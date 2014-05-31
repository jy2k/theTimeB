$(function() {
  $('.js-task-edit-form').submit(function(event) {
    event.preventDefault();
    $.ajax({
      type: "PUT",
      url: $('.js-task-edit-form').attr('action'),
      data: $('.js-task-edit-form').serialize()
    })
    .done(function(data) {
      window.location.href = "/task/" + data.id;
    })
    .error(function() {
      alert("Oops! Something went wrong.");
    });
    return false;
  })
});
