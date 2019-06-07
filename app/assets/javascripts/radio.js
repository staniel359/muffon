$(document).on('turbolinks:load ajaxComplete', () => {
  $('#play_radio_form').on('submit', () => {
    $('#radio_loader_wrap').removeClass('d-none')
  })
  $('#radio_next_track_btn').on('click', () => {
    $('#radio_loader_wrap').removeClass('d-none')
  })
  $('#radio_audio').on('ended', () => {
    $.get({url: '/play_radio'})
    $('#radio_loader_wrap').removeClass('d-none')
  })
  $('#radio_artist_select').on('click', () => {
    $('#radio_artist_field').removeClass('d-none')
    $('#radio_tag_field').addClass('d-none').val('')
  })
  $('#radio_tag_select').on('click', () => {
    $('#radio_tag_field').removeClass('d-none')
    $('#radio_artist_field').addClass('d-none').val('')
  })
})