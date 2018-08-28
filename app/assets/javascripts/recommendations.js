$(document).on('ready turbolinks:load ajaxComplete', function() {
  $('#recommendations-filter-submit-form').submit(function() {
    $('#loading').show()
  });
  showRecommendationsFilterForm();
  enableRecommendationArtistsSearchAutocomplete();
});

function showRecommendationsFilterForm() {
  $('#recommendations-filter-button').click(function() {
    $('#recommendations-filter-form').show()
    $('#recommendations-filter-submit-form input').val('')
    $('#recommendations-filter-submit-form input#artist_name').focus()
  });
};

function enableRecommendationArtistsSearchAutocomplete() {
  $('input#artist_name').autocomplete({
    source: $('input#artist_name').data('autocomplete-source'),
    select: function(e, ui) {
      $('input#artist_name').val(ui.item.label)
      $('#recommendations-filter-submit-form').submit()
    }
  });
}

$(document).keydown(function(e) {
  if(e.which == 27) {
    $('#recommendations-filter-form').hide()
  }
});
