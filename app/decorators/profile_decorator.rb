class ProfileDecorator < Draper::Decorator
  delegate_all

  def any_information?
    attributes.values_at(
      'name', 'gender', 'country', 'city'
    ).compact.any?
  end

  def gender
    case object.gender
    when 'm' then 'mars'
    when 'f' then 'venus'
    when 'o' then 'transgender'
    else 'genderless'
    end
  end

  def name_with_age
    [name, age].compact.join(', ')
  end

  def name
    object.name || 'No Name'
  end

  def age
    ((Time.now - birthdate.to_time) / 1.year.seconds).floor
  end

  def country_flag
    return unless country.present?

    h.flag_icon(I18nData.country_code(country).downcase)
  end

  def country_with_city
    [country, city].compact.join(', ')
  end

  def listening_since
    plays.created_asc.first.created_at.strftime('%e %b %Y')
  end

  def artist_taggings(artist_id)
    taggings.where(
      taggable_type: 'Artist',
      taggable_id:   artist_id
    ).includes(:tag)
  end

  def present_in_library?(artist_id)
    profile_artists.find_by(artist_id: artist_id).present?
  end

  def bookmarked?(model_type, model_id)
    bookmarks.find_by(
      bookmarkable_type: model_type.to_s.remove('Decorator'),
      bookmarkable_id:   model_id
    ).present?
  end

  def listened?(artist_id)
    listened_artists.find_by(artist_id: artist_id).present?
  end
end
