module Recommendations
  class RecommendationArtists < Service
    def call
      process_artists
    end

  private

    def process_artists
      @args.days.present? ? scoped_artists : artists
    end

    def artists
      ProfileArtist.includes(:artist).where(
        id: @args.profile_artists.first(@args.limit)
      )
    end

    def scoped_artists
      artists.joins(:plays).where(
        'plays.created_at > ?', @args.days.to_i.days.ago
      ).group('profile_artists.id').select(
        'profile_artists.*, count(*) as playcount'
      ).reorder('count(*) desc')
    end
  end
end
