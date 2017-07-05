App.tracks_import = App.cable.subscriptions.create "TracksImportChannel",
  connected: ->
    # Called when the subscription is ready for use on the server

  disconnected: ->
    # Called when the subscription has been terminated by the server

  received: (data) ->
    $("#progress-bar_#{data['id']}").show()
    if data['p'] is 1
      $('#job_process').html('Importing listening history...')
      $('#job_entity').html('plays')
    if data['p'] is 2
      $('#job_process').html('Importing tags...')
      $('#job_entity').html('tags')
    if data['p'] is 3
      $('#job_process').html('Generating recommendations...')
      $('#job_total').remove()
      $('#job_count').remove()
      $('#job_entity').remove()
    $('#job_total').html(' of ' + data['t'])
    $('#job-progress').css("width", data['w']+'%')
    $('#job_count').html(data['c'])
    if data['close'] is 1
      $("#progress-bar_#{data['id']}").remove()