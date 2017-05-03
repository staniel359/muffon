App.tracks_import = App.cable.subscriptions.create "TracksImportChannel",
  connected: ->
    # Called when the subscription is ready for use on the server

  disconnected: ->
    # Called when the subscription has been terminated by the server

  received: (data) ->
  	$("#progress-bar_#{data['profile_id']}").show()
  	$('#job_process').html(data['process'])
  	$('#job_total').html(data['total'])
  	$('#job-progress').css("width", data['width']+'%')
  	$('#job_count').html(data['count'])