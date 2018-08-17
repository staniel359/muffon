class LastFMDataImportChannel < ApplicationCable::Channel
  def subscribed
    stream_from "lastfm_data_import_#{current_profile.id}" if broadcast?
  end

private

  def broadcast?
    current_profile.present? &&
      current_profile.lastfm_id.present? &&
      !current_profile.lastfm_import_completed?
  end
end
