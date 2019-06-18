class AlbumDecorator < Draper::Decorator
  delegate_all

  def cover
    object.cover.presence || 'missing_album.png'
  end

  def artist_name
    artist.name
  end

  def release_date
    return unless object.release_date.present?
    return format_year if only_year?
    return format_month_year if only_month_year?
    return format_full_date if full_date?

    nil
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

private

  def only_year?
    object.release_date.match?(/^\d{4}$/)
  end

  def format_year
    (object.release_date + '-01-01').to_time.strftime('%Y')
  end

  def only_month_year?
    object.release_date.match?(/^\d{4}-\d{2}$/)
  end

  def format_month_year
    (object.release_date + '-01').to_time.strftime('%b %Y')
  end

  def full_date?
    object.release_date.match?(/^\d{4}-\d{2}-\d{2}$/)
  end

  def format_full_date
    object.release_date.to_time.strftime('%e %b %Y')
  end
end
