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

function openPlaylistSearch() {
  $('input#q').val('')
  $('#playlist_search_results').html('')
  $('#track_search_panel').show('slide', {direction: 'right'}, 400)
  $('#playlist_content').animate({width:'472px'}, 400)
};

function closePlaylistSearch() {
  $('#track_search_panel').hide('slide', {direction: 'right'}, 400)
  $('#playlist_content').animate({width:'100%'}, 400)
};

function openPlaylistPanel() {
  $('#playlist_flash_msgs').html('')
  $('input#playlist_name').val('')
  $('#add_playlist_panel').show('slide', {direction: 'right'}, 400)
  $('#playlist_content').animate({width:'472px'}, 400)
};

function closePlaylistPanel() {
  $('#add_playlist_panel').hide('slide', {direction: 'right'}, 400)
  $('#playlist_content').animate({width:'100%'}, 400)
};
