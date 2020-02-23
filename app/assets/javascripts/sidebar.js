$(document).on('turbolinks:load', () => {
  sidebarSearchActive = false

  $('#sidebar').on('mouseenter', () => {
    showSidebar()
  })
  $('#sidebar').on('mouseleave', () => {
    if (sidebarSearchActive === false) {
      hideSidebar()
    }
  })
  $('#sidebar-search-input').on('focus', () => {
    sidebarSearchActive = true
  })
  $('#sidebar-search-input').on('focusout', () => {
    sidebarSearchActive = false
  })
  $('#sidebar-music-submenu-header').on('click', () => {
    toggleMusicSubmenu()
  })
  // $(window).on('click', (e) => {
  //   var sidebar = document.getElementById('sidebar')
  //   if (!sidebar.contains(e.target)) {
  //     $('#sidebar-search-results-wrap').hide()
  //     $('#sidebar-search-results').html('')
  //     $('#sidebar-search-input').val('')
  //   }
  // })
});

showSidebar = () => {
  $('#sidebar').css('width', '250px')
}

hideSidebar = () => {
  $('#sidebar').css('width', '50px')
  hideMusicSubmenu()
}

toggleMusicSubmenu = () => {
  $('#sidebar-music-submenu').toggle()
  $('#sidebar-music-submenu-header .fa-caret-down').toggleClass('d-none')
  $('#sidebar-music-submenu-header .fa-caret-up').toggleClass('d-none')
}

hideMusicSubmenu = () => {
  $('#sidebar-music-submenu').hide()
  $('#sidebar-music-submenu-header .fa-caret-down').removeClass('d-none')
  $('#sidebar-music-submenu-header .fa-caret-up').addClass('d-none')
}
