$(document).keydown(function(e) {
  if(e.which == 27) {
    hideLibrarySearch()
  }
});

function hideLibrarySearch() {
  $('#library_search_form').hide()
  $('#library_search_button').show()
  $('#library_search_results').hide()
  $('#library_panel').show()
};

function showLibrarySearch() {
  $('#library_search_form').show()
  $('#library_search_button').hide()
  $('#library_search_input').focus()
};
