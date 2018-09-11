$(document).on('turbolinks:load', () => {
  $('#show-playing-now-panel-btn').click(() => {
    showPlayingNowPanel()
  });
  $('#hide-playing-now-panel-btn').click(() => {
    hidePlayingNowPanel()
  });
  $('.list-play-btn').click(function(){
    $(this).addClass('shown')
  });
  $('.list-play-btn .get-play-btn').click(function(){
    $(this).find('.fa-circle-notch').removeClass('d-none')
    $(this).find('.fa-play').addClass('d-none')
    $(this).find('.fa-times').addClass('d-none')
  });
  $('.play-pause-btn').unbind('click').click(() => {
    playAudio()
  });
  $('audio').on('ended', () => {
    handleAudioEnd()
  })
  enableAudioSeekbar()
});

showPlayerPanel = () => {
  $('#player-panel').show('slide', { direction: 'down' }, 400)
};

hidePlayerPanel = () => {
  $('#player-panel').hide('slide', { direction: 'down' }, 400)
};

showPlayingNowPanel = () => {
  $('#playing-now-panel').show('slide', { direction: 'right' }, 300)
};

hidePlayingNowPanel = () => {
  $('#playing-now-panel').hide('slide', { direction: 'right' }, 300)
};

playAudio = () => {
  audio = $('audio')[0]
  if (audio.paused) {
    audio.play()
    $(".play-pause-btn .fa-pause").removeClass('d-none')
    $(".play-pause-btn .fa-play").addClass('d-none')
  } else {
    audio.pause()
    $(".play-pause-btn .fa-play").removeClass('d-none')
    $(".play-pause-btn .fa-pause").addClass('d-none')
  }
};

enableAudioSeekbar = () => {
  audio = $('audio')[0]
  $('#audio-seekbar').slider({
    range: 'min',
    value: 0,
    value: audio.currentTime,
    slide: function(e, ui) {
      audio.currentTime = audio.duration * ui.value / 100
    },
    step: 0.0001
  });
  $('audio').on('timeupdate', () => {
    $('#audio-seekbar').slider(
      'value', (100 / audio.duration * audio.currentTime)
    )
    min =~~(audio.currentTime / 60)
    sec =~~(audio.currentTime % 60)
    time = (min < 10 ? "0"+min : min) + ':' + (sec < 10 ? "0"+sec : sec)
    $('#audio-current-time').text(time)
  });
};

handleAudioEnd = () => {
  $(".play-pause-btn .fa-play").removeClass('d-none')
  $(".play-pause-btn .fa-pause").addClass('d-none')
  $('#audio-seekbar').slider('value', 0)
};
