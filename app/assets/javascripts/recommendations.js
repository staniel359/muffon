$(document).on('turbolinks:load', () => {
  $('#recommendations-filter-submit-form').submit(() => {
    $('#loading').show()
  });
  showRecommendationsFilterForm();
  enableRecommendationArtistsSearchAutocomplete();
});

$(document).keydown((e) => {
  if(e.which == 27) {
    $('#recommendations-filter-form').hide()
  }
});

showRecommendationsFilterForm = () => {
  $('#recommendations-filter-button').click(() => {
    $('#recommendations-filter-form').show()
    $('#recommendations-filter-submit-form input').val('')
    $('#recommendations-filter-submit-form input#artist_name').focus()
  });
};

enableRecommendationArtistsSearchAutocomplete = () => {
  $('input#artist_name').autocomplete({
    source: $('input#artist_name').data('autocomplete-source'),
    select: (e, ui) => {
      $('input#artist_name').val(ui.item.label)
      $('#recommendations-filter-submit-form').submit()
    }
  });
};
