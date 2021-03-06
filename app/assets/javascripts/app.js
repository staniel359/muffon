$(document).on('turbolinks:load', () => {
  $('[data-toggle="tooltip"]').tooltip();
  $('[data-toggle="popover"]').popover();
  enableAvatarUploading()
  enableCountryNamesAutocomplete()
  enableScrollspy()
  $('#scroll-top-btn').click((e) => {
    $('html, body').animate({scrollTop: 0}, 300);
  })
});

$(window).scroll(() => {
  enableScrollToTopButton();
});

enableScrollToTopButton = () => {
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

enableAvatarUploading = () => {
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

enableCountryNamesAutocomplete = () => {
  $('#profile_country').autocomplete({
    source: $('#countries_list').data('autocomplete-source')
  })
};

enableScrollspy = () => {
  $('body').scrollspy({ target: '.scrollspy', offset: 100 })
  $(".scrollspy a").on('click', function(event) {
    if (this.hash !== "") {
      event.preventDefault();
      var hash = this.hash;
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 300);
    }
  });
};
