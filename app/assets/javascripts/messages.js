$(document).on('turbolinks:load', () => {
  $('#new-message-modal-wrap').on('shown.bs.modal', function() {
    $('[autofocus]', this).focus();
  });
});
