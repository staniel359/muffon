$(document).on('ready turbolinks:load', function() {
  $('#library-search-btn').click(function() {
    showLibrarySearch()
  })
  enableLiveLibrarySearch()
});

function showLibrarySearch() {
  $('#library-search-form input')[1].value = ''
  $('#library-search-form-wrap').fadeIn(100)
  $('#library-search-form input').focus()
};

$(document).keydown(function(e) {
  if(e.which == 27) {
    hideLibrarySearch()
  }
});

function hideLibrarySearch() {
  $('#library-search-form-wrap').fadeOut(100)
  $('#library-search-results-wrap').html('')
};

function enableLiveLibrarySearch() {
  var timeout = null;
  $('#library-search-form input').unbind('keyup').keyup(function(e) {
    clearTimeout(timeout);
    timeout = setTimeout(function() {
      lettersAndNumbers = e.which >= 48 && e.which <= 90
      numpad = e.which >= 96 && e.which <= 111
      punctuationMarks = e.which >= 186 && e.which <= 222
      if (lettersAndNumbers || numpad || punctuationMarks) {
        $('#library-search-submit-form').submit();
      }
    }, 400);
  })
};
