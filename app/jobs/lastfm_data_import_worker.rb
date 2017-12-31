class LastfmDataImportWorker
  include Sidekiq::Worker

  sidekiq_options retry: false

  def perform(profile_id)
    Lastfm::Plays::Importer.call(profile_id: profile_id)
    Lastfm::LovedTracks::Importer.call(profile_id: profile_id)
    Lastfm::Tags::Importer.call(profile_id: profile_id)
    Lastfm::Recommendations::ArtistsProcessor.call(profile_id: profile_id)
  end
end
