module StatsHelper
  def plays_data
    area_chart(
      @plays_data,
      id: SecureRandom.hex(7),
      colors: ['#7a47c0'],
      label: 'Plays',
      messages: { empty: 'No data' }
    )
  end

  def artists_data
    bar_chart(@artists_data, bar_charts_data)
  end

  def tracks_data
    bar_chart(@tracks_data, bar_charts_data)
  end

  def tags_data
    pie_chart(
      @tags_data,
      id: SecureRandom.hex(7),
      messages: { empty: 'No data' }
    )
  end

  def new_tracks_data
    area_chart(
      @new_tracks_data,
      id: SecureRandom.hex(7),
      label: 'New tracks',
      colors: ['#7a47c0'],
      messages: { empty: 'No data' }
    )
  end

  def new_artists_data
    area_chart(
      @new_artists_data,
      id: SecureRandom.hex(7),
      label: 'New artists',
      colors: ['#7a47c0'],
      messages: { empty: 'No data' }
    )
  end

  def tags_timeline_data
    line_chart(
      @tags_timeline_data,
      id: SecureRandom.hex(7),
      messages: { empty: 'No data' },
      height: '400px'
    )
  end

private

  def bar_charts_data
    {
      id: SecureRandom.hex(7),
      colors: ['#7a47c0'],
      label: 'Plays',
      height: '500px',
      messages: { empty: 'No data' },
      library: {
        scales: { yAxes: [{ ticks: { autoSkip: false } }] }
      }
    }
  end
end
