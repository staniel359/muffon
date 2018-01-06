// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require jquery.remotipart
//= require jquery-ui
//= require turbolinks
//= require bootstrap-sprockets
//= require_tree .

$(document).on('turbolinks:load', function() {
  $('[data-toggle="tooltip"]').tooltip({trigger: 'hover'});
  $('[data-toggle="popover"]').popover();
  if ($("#playing_now").css("display") == 'block') {
    $('.center').css('margin-left','80px')
  };
  if ($("#player").css("display") == 'block') {
    $('#footer').css('height','200px')
    $('#progress_bars').css('bottom','65px')
  }  
});

$(document).ready(function() {
  $('iframe').attr('src', '')
});

function showPlayer() {
  $('#player').show('slide', {direction:'down'}, 400)
  $('#footer').animate({'height': '200px'}, 400)
  $('#progress_bars').animate({'bottom': '65px'}, 400)
}

function hidePlayer() {
  $('#player').hide('slide', {direction:'down'}, 400)
  $('#footer').animate({'height': '150px'}, 400)
  $('#progress_bars').animate({'bottom': '15px'}, 400)
}

function showPlayingNow() {
  $('#playing_now').show('slide', {direction: 'right'}, 400)
  $('.center').animate({'marginLeft':'80px'}, 400)
};

function hidePlayingNow() {
  $('#playing_now').hide('slide', {direction: 'right'}, 500)
  $('.center').animate({'marginLeft':'220px'}, 400)
};

function showSearch(){
  $('#up_search').animate({left: '290px'});
  $('#upbar').animate({left: '140px'});
};

function hideSearch(){
  $('#up_search').animate({left: '-290px'});
  $('#upbar').animate({left: '-140px'});
};

function toggleIcons(){
  $('#side_up_down_icons').toggle();
  $('#iconBtn').toggleClass('rotated');
};

function showLoading() {
  $('#loading').show()
};

function loadTrack(e) {
  $(e).find('i').removeClass('fa-play').addClass('fa-circle-o-notch fa-spin')
};

function closeDropdown() {
  $('.dropdown.open .dropdown-toggle').dropdown('toggle');
};

$(window).scroll(function() {
  if (window.pageYOffset > 300) {
    $('#scroll_top_btn').fadeIn(200)
  } else {
    $('#scroll_top_btn').fadeOut(200)
  };

  scrollPosition = $(document).height() - window.pageYOffset
  bottomPosition = 690 + $('#footer').height()

  if (scrollPosition < bottomPosition) {
    $('#scroll_top_btn').removeClass('fixed').addClass('absolute')
  } else {
    $('#scroll_top_btn').removeClass('absolute').addClass('fixed')
  }
});

function scrollToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

function toggleFilter() {
  $('#recommendation_filter_panel').slideToggle('100')
};

function toggleSearch() {
  $('#library_search_panel').slideToggle('100')
};

function openPlaylistSearch() {
  $('#track_search_panel').show('slide', {direction: 'right'}, 400)
  $('#playlist_tracks').animate({width:'432px'}, 400)
};

function closePlaylistSearch() {
  $('#track_search_panel').hide('slide', {direction: 'right'}, 400)
  $('#playlist_tracks').animate({width:'752'}, 400)
  $('input#query').val('')
  $('#playlist_search_results').html('')
};

function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      $('#img_preview').attr('src', e.target.result).width(110);
      $('#profile_remote_avatar_url').remove();
    };
    reader.readAsDataURL(input.files[0]);
  }
};

function openPlaylistPanel() {
  $('#add_playlist_panel').show('slide', {direction: 'right'}, 400)
  $('#profile_playlists').animate({width:'432px'}, 400)
};

function closePlaylistPanel() {
  $('#add_playlist_panel').hide('slide', {direction: 'right'}, 400)
  $('#profile_playlists').animate({width:'752'}, 400)
};

function playAudio() {
  audio = document.getElementById('audio');
  // visualize()

  if (audio.paused) {
    audio.play()
    $("#list_playing_now_button > i").removeClass('fa-play').addClass('fa-pause')
    $('#player_play_btn > i').removeClass('fa-play').addClass('fa-pause')
  } else {
    audio.pause()
    $("#list_playing_now_button > i").removeClass('fa-pause').addClass('fa-play')
    $('#player_play_btn > i').removeClass('fa-pause').addClass('fa-play')
  }
};

function visualize() {
  audio = document.getElementById('audio');
  audio.crossOrigin = 'anonymous'
  var context = new AudioContext();
  var src = context.createMediaElementSource(audio);
  var analyser = context.createAnalyser();
  var canvas = document.getElementById('canvas');
  canvas.width = 223;
  canvas.height = 55;
  var ctx = canvas.getContext('2d');
  src.connect(analyser);
  analyser.connect(context.destination);
  analyser.fftSize = 256;
  var bufferLength = analyser.frequencyBinCount;
  var dataArray = new Uint8Array(bufferLength);
  var WIDTH = canvas.width;
  var HEIGHT = canvas.height;
  var barWidth = WIDTH / bufferLength;
  var barHeight;
  var x = 0;

  function renderFrame() {
    requestAnimationFrame(renderFrame);
    x = 0;
    analyser.getByteFrequencyData(dataArray);
    ctx.fillStyle = 'rgba(38, 26, 51, 0.7)';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    for (var i = 0; i < bufferLength; i++) {
      barHeight = dataArray[i]*0.2;
      ctx.fillStyle = '#392d50';
      ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);
      x += barWidth + 1;
    }
  }
  renderFrame();
};

$(document).ready(function() {
  $('audio').on('timeupdate', function(){
    $('#player_current_time').html(new Date(Math.floor(this.currentTime) * 1000).toISOString().substr(14, 5))
    $('#player_full_time').html(new Date(Math.floor(this.duration) * 1000).toISOString().substr(14, 5))
    $('input[type="range"]').val(this.currentTime).attr('value', this.currentTime).attr('max', this.duration)
  });

  $('input[type="range"]').on('change', function() {
    audio = document.getElementById('audio');
    audio.currentTime = this.value
    $('#player_current_time').html(new Date(Math.floor(this.value) * 1000).toISOString().substr(14, 5))
  });

  $('audio').on('ended', function(){
    $("#list_playing_now_button > i").removeClass('fa-pause').addClass('fa-play')
    $('#player_play_btn > i').removeClass('fa-pause').addClass('fa-play')
    $('#player_current_time').html('00:00')
    $('input[type="range"]').val(0).attr('value', 0).attr('max', this.duration)
  });
});

