class TrackDecorator < Draper::Decorator
  delegate_all

  def artist_name
    artist.name
  end

  def artist_image
    artist.decorate.image
  end

  def duration
    return unless object.duration.present?

    Time.at(object.duration).strftime('%M:%S')
  end

  def first_album
    Album.find_by(id: album_ids.first)&.decorate
  end

  def album_cover
    first_album&.cover || 'missing_album.png'
  end

  def tags
    Tag.find(tag_ids).pluck(:name)
  end
end
