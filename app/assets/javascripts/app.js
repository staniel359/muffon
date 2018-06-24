$(document).on('ready turbolinks:load', function() {
  enableTooltips();
  enablePopovers();
  clearIframe();
});

$(window).scroll(function() {
  enableScrollToTopButton();
});

function enableTooltips() {
  $('[data-toggle="tooltip"]').tooltip();
};

function enablePopovers() {
  $('[data-toggle="popover"]').popover();
};

function clearIframe() {
  $('iframe').attr('src', '')
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

function closeDropdown() {
  $('.dropdown.open .dropdown-toggle').dropdown('toggle');
};

function scrollToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
};

function enableScrollToTopButton() {
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
