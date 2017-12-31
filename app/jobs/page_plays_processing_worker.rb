class PagePlaysProcessingWorker
  include Sidekiq::Worker

  sidekiq_options retry: false, queue: 'lastfm_data_import'

  def perform(page, profile_id)
    Lastfm::Plays::Processor.call(
      page: page, profile_id: profile_id
    )
  end
end
