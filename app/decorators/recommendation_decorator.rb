class RecommendationDecorator < Draper::Decorator
  delegate_all

  def artist_image
    artist.decorate.image
  end

  def artist_name
    artist.name
  end

  def tags
    artist.decorate.top_tags.first(5)
  end

  def profile_artists(days = nil)
    Recommendations::ProfileArtists.call(
      profile_artist_ids: profile_artist_ids,
      days:               days
    ).decorate
  end

  def artist_description
    artist.description
  end
end
