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
    Album.find_by(id: album_ids.first).decorate
  end
end
