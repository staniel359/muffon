class ArtistRecommendationsProcessorWorker
  include Sidekiq::Worker

  sidekiq_options retry: false, queue: 'artist_recommendations'

  def perform(args); end
end
