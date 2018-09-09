$(document).on('turbolinks:load', () => {
  $('.search-form').submit(() => {
    $('#loading').show()
  })
  enableLiveSearch()
})

enableLiveSearch = () => {
  var timeout = null;
  $('#sidebar-search-form input').keyup((e) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      backspace = e.which == 8
      space = e.which == 32
      lettersAndNumbers = e.which >= 48 && e.which <= 90
      numpad = e.which >= 96 && e.which <= 111
      punctuationMarks = e.which >= 186 && e.which <= 222
      minus = e.which == 173
      if (backspace || space || lettersAndNumbers || numpad || punctuationMarks || minus) {
        $('#sidebar-search-results-wrap').show()
        $('#sidebar-search-results').hide()
        $('#sidebar-search-results').html('')
        $('#sidebar-loading').show()
        $.ajax({
          method: 'GET',
          url: '/sidebar_search',
          data: { q: $('#sidebar-search-form input')[1].value }
        })
      }
    }, 500);
  })
};
