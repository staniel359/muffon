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
  if ($("#playing_now").css("display") == 'block') {
    $('.center').css('margin-left','80px')
  }
});

$(document).on('turbolinks:load', function() {
  if ($("#player").css("display") == 'block') {
    $('#footer').css('height','205px')
    $('#progress_bars').css('bottom','65px')
  }
});

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
