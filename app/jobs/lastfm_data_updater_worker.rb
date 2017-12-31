class LastfmDataUpdaterWorker
  include Sidekiq::Worker

  sidekiq_options retry: false

  def perform(profile_id)
    %w[Plays LovedTracks Tags Recommendations].each do |service|
      "Lastfm::#{service}::Updater".constantize.call(
        profile_id: profile_id
      )
    end
  end
end
