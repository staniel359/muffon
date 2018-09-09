$(document).on('turbolinks:load', () => {
  $('#library-search-btn').click(() => {
    showLibrarySearch()
  })
  enableLibraryLiveSearch()
});

$(document).keydown((e) => {
  if(e.which == 27) {
    hideLibrarySearch()
  }
});

showLibrarySearch = () => {
  $('#library-search-form input')[1].value = ''
  $('#library-search-form-wrap').fadeIn(100)
  $('#library-search-form input').focus()
};

hideLibrarySearch = () => {
  $('#library-search-form-wrap').fadeOut(100)
  $('#library-search-results-wrap').html('')
};

enableLibraryLiveSearch = () => {
  var timeout = null;
  $('#library-search-form input').keyup(function(e) {
    clearTimeout(timeout);
    timeout = setTimeout(function() {
      backspace = e.which == 8
      space = e.which == 32
      lettersAndNumbers = e.which >= 48 && e.which <= 90
      numpad = e.which >= 96 && e.which <= 111
      punctuationMarks = e.which >= 186 && e.which <= 222
      minus = e.which == 173
      if (backspace || space || lettersAndNumbers || numpad || punctuationMarks || minus) {
        $('#library-search-submit-form').submit();
      }
    }, 500);
  })
};
