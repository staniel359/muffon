class AlbumDecorator < Draper::Decorator
  delegate_all

  def cover
    object.cover.presence || 'missing_album.png'
  end

  def artist_name
    artist.name
  end

  def release_date
    object.release_date&.to_time&.strftime('%e %b %Y')
  rescue ArgumentError
    object.release_date
  end

  def labels
    Label.find(label_ids)
  end

  def tags
    Tag.find(tag_ids)
  end

  def tracks
    Track.find(track_ids)
  end
end
