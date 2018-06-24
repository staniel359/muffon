module ProfilesHelper
  def country_flag
    return unless @profile.country.present?

    flag_icon(@profile.country.downcase.to_sym)
  end

  def country_name
    ISO3166::Country[@profile.country]&.name
  end

  def city_with_country
    [@profile.city, country_name].compact.join(', ')
  end
end
