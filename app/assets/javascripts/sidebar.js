$(document).on('ready turbolinks:load', function() {
  $('#sidebar-music-submenu-header').unbind('click').click(function() {
    $('#sidebar-music-submenu table').toggle()
  })
  $('#sidebar').mouseleave(function() {
    $('#sidebar-music-submenu table').hide()
  })
});
