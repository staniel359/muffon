App.tracks_import = App.cable.subscriptions.create "TracksImportChannel",
  connected: ->
    # Called when the subscription is ready for use on the server

  disconnected: ->
    # Called when the subscription has been terminated by the server

  received: (data) ->
    $("#progress-bar_#{data['id']}").show()
    if data['p'] is 1
      $('#job_process').html('Importing listening history...')
      $('#job_entity').html('tracks')
    if data['p'] is 2
      $('#job_process').html('Updating artists...')
      $('#job_entity').html('artists')
    if data['p'] is 3
      $('#job_process').html('Updating albums...')
      $('#job_entity').html('albums')
    if data['p'] is 4
      $('#job_process').html('Updating tracks...')
      $('#job_entity').html('tracks')
    if data['p'] is 5
      $('#job_process').html('Importing loved tracks...')
      $('#job_entity').html('tracks')
    if data['p'] is 6
      $('#job_process').html('Importing tags...')
      $('#job_entity').html('tags')
    if data['p'] is 7
      $('#job_process').html('Generating recommendations...')
      $('#job_total').remove()
      $('#job_count').remove()
      $('#job_entity').remove()
    $('#job_total').html(' of ' + data['t'])
    $('#job-progress').css("width", data['w']+'%')
    $('#job_count').html(data['c'])
    if data['close'] is 1
      $("#progress-bar_#{data['id']}").remove()