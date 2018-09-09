$(document).on('turbolinks:load', () => {
  $(window).scroll(() => {
    if ($(this).scrollTop() > 100) {
      $('#album-title-left').show('slide', { direction:'up' }, 200)
    } else {
      $('#album-title-left').hide('slide', { direction:'up' }, 200)
    }
  })
})