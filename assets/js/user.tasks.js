$(function() {
  $('.js-destroy-all').submit(function(event) {
    event.preventDefault();
    $.ajax({
      url: $(this).attr('action'),
      type: 'DELETE',
      success: function(result) {
        window.location.href = "/user/tasks";
      }
    });
    return false;
  })
});
