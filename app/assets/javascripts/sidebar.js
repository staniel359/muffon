$(document).on('turbolinks:load', () => {
  $('#sidebar').mouseleave(() => {
    $('#sidebar-music-submenu table').hide()
  })
  $('#sidebar-search-input').on('focus', () => {
    $('#sidebar').css('width', '250px')
  })
  $('body').keydown((e) => {
    if (e.which == 27) {
      $('#sidebar').css('width', '50px')
      $('#sidebar-search-results-wrap').hide()
      $('#sidebar-search-results').html('')
      $('#sidebar-search-input').val('')
    }
  })
  $('#sidebar-music-submenu-header').click(() => {
    $('#sidebar-music-submenu table').toggle()
  })
});
