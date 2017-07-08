module ProfilesHelper
  def get_common_artists
    @common_artists = (current_profile.profile_artists.map(&:artist_id) & @profile.profile_artists.map(&:artist_id)).map { |a| Artist.find(a).profile_artists.find_by(profile_id: @profile.id) }.sort_by(&:count).reverse
  end
end
