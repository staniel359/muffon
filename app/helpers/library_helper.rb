module LibraryHelper
  def library_width_of(track)
    track.plays_count.to_f * 70.0 / profile_top_track_count
  end

  def scope_text(collection)
    scopes_hash[
      (params[:scope] || collection_scope(collection)).to_s
    ]
  end

  def scopes_hash
    {
      '7' => '1 week',
      '30' => '1 month',
      '90' => '3 months',
      '180' => '6 months',
      '365' => '1 year',
      '0' => 'All time'
    }
  end

  def scope_changed?
    params[:scope].present? &&
      params[:scope].to_i != collection_scope(params[:collection])
  end

  def order_text
    orders_hash[params[:order]] || 'Most played'
  end

  def orders_hash
    {
      '0' => 'Most played',
      '1' => 'Least played',
      '2' => 'Newest',
      '3' => 'Oldest'
    }
  end

private

  def profile_top_track_count
    @profile_top_track_count ||=
      @profile.profile_tracks.plays_count_desc.first.plays_count
  end

  def collection_scope(collection)
    @profile.send("#{collection}_scope")
  end
end
