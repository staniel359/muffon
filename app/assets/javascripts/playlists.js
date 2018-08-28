$(document).on('ready turbolinks:load', function() {
  $('#new-playlist-modal').on('shown.bs.modal', function() {
    $('#new-playlist-modal input#playlist_name').val('');
    $(this).find('[autofocus]').focus();
  });
  $('#playlist-search-modal').on('shown.bs.modal', function() {
    $('#playlist-search-modal input#q').val('');
    $('#playlist-search-results').hide();
    $('#playlist-search-results-placeholder').show();
    $(this).find('[autofocus]').focus();
  });
  enablePlaylistLiveSearch();
});

function enablePlaylistLiveSearch() {
  var timeout = null;
  $('#playlist-search-modal input').unbind('keyup').keyup(function(e) {
    clearTimeout(timeout);
    timeout = setTimeout(function() {
      lettersAndNumbers = e.which >= 48 && e.which <= 90
      numpad = e.which >= 96 && e.which <= 111
      punctuationMarks = e.which >= 186 && e.which <= 222
      if (lettersAndNumbers || numpad || punctuationMarks) {
        $('#playlist-search-submit-form').submit();
      }
    }, 400);
  })
};

$(window).on('shown.bs.modal', function() {
  selectPlaylists();
});

function selectPlaylists() {
  $('.playlist_select').click(function() {
    var checkbox = $(this).children('input[type="checkbox"]')
    if (checkbox.prop('checked')) {
      $(this).css('backgroundColor', 'transparent');
      checkbox.prop('checked', false);
    } else {
      $(this).css('backgroundColor', '#1c1326');
      checkbox.prop('checked', true);
    }
  });
};

$(document).on('ready turbolinks:load ajaxComplete', function() {
  $("div[id^='playlist-add']").click(function() {
    $(this).find('i').removeClass('fa-plus').addClass('fa-circle-notch fa-spin')
  })
});
