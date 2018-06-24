module Recommendations
  class ProfileArtists < Muffon::Base
    def call
      retrieve_profile_artists
    end

  private

    def retrieve_profile_artists
      return profile_artists unless @args.days.present?

      time_scoped_profile_artists
    end

    def profile_artists
      ProfileArtist.where(
        id: @args.profile_artist_ids
      ).includes(:artist).plays_count_desc
    end

    def time_scoped_profile_artists
      profile_artists.joins(:plays).where(
        'plays.created_at > ?', @args.days.days.ago
      ).group('profile_artists.id').select(
        'profile_artists.*, COUNT(*) as plays_count'
      )
    end
  end
end
