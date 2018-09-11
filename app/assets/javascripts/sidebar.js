$(document).on('turbolinks:load', () => {
  $('#sidebar').mouseleave(() => {
    $('#sidebar-music-submenu').hide()
    $('#sidebar-music-submenu-header .fa-caret-down').removeClass('d-none')
    $('#sidebar-music-submenu-header .fa-caret-up').addClass('d-none')
    $('#sidebar-search-results-wrap').hide()
    $('#sidebar-search-results').html('')
    $('#sidebar-search-input').val('')
  })
  $('#sidebar-search-input').on('focus', () => {
    $('#sidebar').css('width', '250px')
  })
  $('#sidebar-search-input').on('focusout', () => {
    $('#sidebar').css('width', '50px')
  })
  $('#sidebar-music-submenu-header').click(() => {
    $('#sidebar-music-submenu').toggle()
    $('#sidebar-music-submenu-header .fa-caret-down').toggleClass('d-none')
    $('#sidebar-music-submenu-header .fa-caret-up').toggleClass('d-none')
  })
});
