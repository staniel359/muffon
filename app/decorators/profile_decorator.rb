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
    ).associated
  end

  def new_conversations
    Message.where.not(profile_id: id).where(
      conversation_id: conversations.pluck(:id), new: true
    ).pluck(:conversation_id).uniq
  end
end
