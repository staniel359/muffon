App.tracks_import = App.cable.subscriptions.create("LastFMDataImportChannel", {
  received: function(data) {
    total = data['t']
    count = data['c']
    width = (count / total * 100)

    if (data['p'] == 1) {
      processName = 'Importing plays...'
      items = 'plays'
    } else if (data['p'] == 2) {
      processName = 'Importing loved tracks...'
      items = 'tracks'
    } else if (data['p'] == 3) {
      processName = 'Importing tags...'
      items = 'tags'
    } else if (data['p'] == 4) {
      processName = 'Generating recommendations...'
      items = 'artists'
    }

    $("#progress-bar").show()
    $("#job-process").html(processName)

    if (total && count) {
      $("#job-progress").css("width", width + '%')
      $("#job-counter").html(count + ' of ' + total + ' ' + items)
    }

    if (width == 100) {
      $("#progress-bar").hide()
    }
  }
});
  