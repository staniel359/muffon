$(document).on('ready turbolinks:load', function() {
  changeViewWithShownPlayingNow();
  changeViewWithShownPlayer();
  handlePlayerAudioTimeChange();
  handlePlayerAudioEnd();
  handlePlayerTimeBarPositionChange();
});

$(document).keydown(function(e) {
  enablePreviousTrackKeyboardChange(e);
  enableNextTrackKeyboardChange(e);
});

function changeViewWithShownPlayingNow() {
  playingNowShown = ($("#playing_now").css("display") == 'block')
  if (playingNowShown) {
    $('.center').css('margin-left','80px')
  };
};

function changeViewWithShownPlayer() {
  playerShown = ($("#player").css("display") == 'block')
  if (playerShown) {
    $('#footer').css('height','200px')
    $('#progress_bars').css('bottom','60px')
  };
};

function enablePreviousTrackKeyboardChange(e) {
  if(e.which == 37 && e.ctrlKey) {
    $('#player_previous_btn > form > button').click()
  }
};

function enableNextTrackKeyboardChange(e) {
  if(e.which == 39 && e.ctrlKey) {
    $('#player_next_btn > form > button').click()
  }
};

function showPlayer() {
  $('#player').show('slide', {direction:'down'}, 400)
  $('#footer').animate({'height': '200px'}, 400)
  $('#progress_bars').animate({'bottom': '60px'}, 400)
};

function hidePlayer() {
  $('#player').hide('slide', {direction:'down'}, 400)
  $('#footer').animate({'height': '150px'}, 400)
  $('#progress_bars').animate({'bottom': '10px'}, 400)
};

function showPlayingNow() {
  $('#playing_now').show('slide', {direction: 'right'}, 400)
  $('.center').animate({'marginLeft':'80px'}, 400)
};

function hidePlayingNow() {
  $('#playing_now').hide('slide', {direction: 'right'}, 400)
  $('.center').animate({'marginLeft':'220px'}, 400)
};

function loadTrack(e) {
  $(e).find('i').removeClass('fa-play').addClass('fa-circle-notch fa-spin')
  $(e).css('opacity', 1)
};

function playAudio() {
  audio = $('audio')[0];
  // visualizeAudio()

  if (audio.paused) {
    audio.play()
    $("*#list_playing_now_button").removeClass('fa-play').addClass('fa-pause')
    $('#player_play_btn_icon').removeClass('fa-play').addClass('fa-pause')
  } else {
    audio.pause()
    $("*#list_playing_now_button").removeClass('fa-pause').addClass('fa-play')
    $('#player_play_btn_icon').removeClass('fa-pause').addClass('fa-play')
  }
};

function handlePlayerAudioTimeChange() {
  $('audio').on('timeupdate', function(){
    $('#player_current_time').html(new Date(Math.floor(this.currentTime) * 1000).toISOString().substr(14, 5))
    $('#player_full_time').html(new Date(Math.floor(this.duration) * 1000).toISOString().substr(14, 5))
    $('input[type="range"]').val(this.currentTime).attr('value', this.currentTime).attr('max', this.duration)
  });
};

function handlePlayerTimeBarPositionChange() {
  $('input[type="range"]').on('change', function() {
    audio = document.getElementById('audio');
    audio.currentTime = this.value
    $('#player_current_time').html(new Date(Math.floor(this.value) * 1000).toISOString().substr(14, 5))
  });
};

function handlePlayerAudioEnd() {
  $('audio').on('ended', function(){
    $("#list_playing_now_button").removeClass('fa-pause').addClass('fa-play')
    $('#player_play_btn_icon').removeClass('fa-pause').addClass('fa-play')
    $('#player_current_time').html('00:00')
    $('input[type="range"]').val(0).attr('value', 0).attr('max', this.duration)
  });
};
