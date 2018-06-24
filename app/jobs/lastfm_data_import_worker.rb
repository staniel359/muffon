class LastFMDataImportWorker
  include Sidekiq::Worker

  sidekiq_options retry: false

  def perform(profile_id)
    LastFM::Importer.call(profile_id: profile_id)
  end
end
