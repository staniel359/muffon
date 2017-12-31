class RecommendationArtistProcessorWorker
  include Sidekiq::Worker

  def perform(profile_artist_id, profile_id)
    Lastfm::Recommendations::ArtistProcessor.call(
      profile_artist_id: profile_artist_id,
      profile_id: profile_id
    )
  end
end
