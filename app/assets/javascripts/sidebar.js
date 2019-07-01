$(document).on('turbolinks:load', () => {
  $('#sidebar-search-input').on('focus', () => {
    $('#sidebar').css('width', '250px')
  })
  $(window).on('click', () => {
    $('#sidebar-music-submenu').hide()
    $('#sidebar-music-submenu-header .fa-caret-down').removeClass('d-none')
    $('#sidebar-music-submenu-header .fa-caret-up').addClass('d-none')
    $('#sidebar').css('width', '50px')
    $('#sidebar-search-results-wrap').hide()
    $('#sidebar-search-results').html('')
    $('#sidebar-search-input').val('')
  })
  $('#sidebar').on('click', (e) => {
    e.stopPropagation()
  })
  $('#sidebar-music-submenu-header').click(() => {
    $('#sidebar-music-submenu').toggle()
    $('#sidebar-music-submenu-header .fa-caret-down').toggleClass('d-none')
    $('#sidebar-music-submenu-header .fa-caret-up').toggleClass('d-none')
  })
});
