App.tracks_import = App.cable.subscriptions.create "TracksImportChannel",
  connected: ->
    # Called when the subscription is ready for use on the server

  disconnected: ->
    # Called when the subscription has been terminated by the server

  received: (data) ->
    total = data['t']
    count = data['c']
    width = (count / total * 100)

    # Plays

    if data['p'] is 1
      $("#plays_import_#{data['id']}").show()
      $("#plays_import_#{data['id']} > .progress > #job-progress").css("width", width+'%')

      if total && count
        $("#plays_import_#{data['id']} > .job_status > #job_entity").html('plays')
        $("#plays_import_#{data['id']} > .job_status > #job_count").html(count)
        $("#plays_import_#{data['id']} > .job_status > #job_total").html(' of ' + total)

      if width == 100
        $("#plays_import_#{data['id']}").remove()

    # Tags

    if data['p'] is 2
      $("#tags_import_#{data['id']}").show()
      $("#tags_import_#{data['id']} > .progress > #job-progress").css("width", width+'%')

      if total && count
        $("#tags_import_#{data['id']} > .job_status > #job_entity").html('tags')
        $("#tags_import_#{data['id']} > .job_status > #job_count").html(count)
        $("#tags_import_#{data['id']} > .job_status > #job_total").html(' of ' + total)

      if width == 100
        $("#tags_import_#{data['id']}").remove()

    # Recommendations
      
    if data['p'] is 3
      $("#recommendations_import_#{data['id']}").show()
      $("#recommendations_import_#{data['id']} > .progress > #job-progress").css("width", width+'%')
      $("#recommendations_import_#{data['id']} > .job_status > #job_process").html('Generating recommendations...')

      if total && count
        $("#recommendations_import_#{data['id']} > .job_status > #job_entity").html('artists')
        $("#recommendations_import_#{data['id']} > .job_status > #job_count").html(count)
        $("#recommendations_import_#{data['id']} > .job_status > #job_total").html(' of ' + total)

      if width == 100
        $("#recommendations_import_#{data['id']}").remove()

    # Loved tracks

    if data['p'] is 4
      $("#loved_tracks_import_#{data['id']}").show()
      $("#loved_tracks_import_#{data['id']} > .progress > #job-progress").css("width", width+'%')

      if total && count
        $("#loved_tracks_import_#{data['id']} > .job_status > #job_entity").html('tracks')
        $("#loved_tracks_import_#{data['id']} > .job_status > #job_count").html(count)
        $("#loved_tracks_import_#{data['id']} > .job_status > #job_total").html(' of ' + total)

      if width == 100
        $("#loved_tracks_import_#{data['id']}").remove()

    # if data['p'] is 4
    #   $('#job_process').html('Updating recommendations...')
    #   $('#job_entity').html('tags') if total && count
    
    