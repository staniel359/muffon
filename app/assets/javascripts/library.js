$(document).on('ready turbolinks:load', function() {
  $('#library-search-btn').click(function() {
    showLibrarySearch()
  })
  enableLibraryLiveSearch()
  enableLibraryScrollspy()
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

function enableLibraryLiveSearch() {
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

function enableLibraryScrollspy() {
  $('body').scrollspy({ target: '#library-scrollspy', offset: 100 })
  $("#library-scrollspy a").on('click', function(event) {
    if (this.hash !== "") {
      event.preventDefault();
      var hash = this.hash;
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 300);
    }
  });
}
