$(document).on('ready turbolinks:load', function() {
  $('[data-toggle="tooltip"]').tooltip();
  $('[data-toggle="popover"]').popover();
  $('iframe').attr('src', '')
  enableAvatarUploading()
  enableCountryNamesAutocomplete()
  $('#scroll-top-btn').click(function(e) {
    $('html, body').animate({scrollTop: 0}, 300);
  })
});

$(window).scroll(function() {
  enableScrollToTopButton();
});

function enableScrollToTopButton() {
  if (window.pageYOffset > 300) {
    $('#scroll-top-btn').fadeIn(200)
  } else {
    $('#scroll-top-btn').fadeOut(200)
  };

  scrollPosition = $(document).height() - window.pageYOffset
  bottomPosition = 690 + $('#footer').height()

  if (scrollPosition < bottomPosition) {
    $('#scroll-top-btn').removeClass('position-fixed').addClass('position-absolute')
  } else {
    $('#scroll-top-btn').removeClass('position-absolute').addClass('position-fixed')
  }
};

function enableAvatarUploading() {
  $('#profile_avatar, #group_avatar').change(function() {
    if (this.files && this.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
        $('#profile-avatar-preview, #group-avatar-preview').attr(
          'src', e.target.result
        ).width(110);
        $('#profile_remote_avatar_url').remove();
      };
      reader.readAsDataURL(this.files[0]);
    }
  });
};

function enableCountryNamesAutocomplete() {
  $('#profile_country').autocomplete({
    source: $('#countries_list').data('autocomplete-source')
  })
};
