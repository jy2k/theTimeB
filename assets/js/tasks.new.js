$(function() {
  $('.js-task-new-form').submit(function(event) {
    event.preventDefault();
    $.post('/task/create', $('.js-task-new-form').serialize())
      .done(function(data) {
        window.location.href = "/task/" + data.id;
      })
      .error(function() {
        alert("Oops! Something went wrong.");
      });
    return false;
  })
});
