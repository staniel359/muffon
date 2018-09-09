$(document).on('turbolinks:load', () => {
  $('#destroy-profile-modal').on('shown.bs.modal', () => {
    $('input#nickname').focus()
  })
});
