class ArtistUpdateWorker
  include Sidekiq::Worker

  sidekiq_options retry: false

  def perform(artist_name)
    Muffon::Processor::Artist.call(artist_name: artist_name)
  end
end
