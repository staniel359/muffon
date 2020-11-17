module LastFM
  class Importer < LastFM::Base
    def call
      import_lastfm_data
    end

  private

    def import_lastfm_data
      services_list.each { |s| call_service(s) }
    end

    def services_list
      %w[Plays LovedTracks Tags Recommendations]
    end

    def call_service(service)
      "LastFM::Import::#{service}".constantize.call(
        profile_id: @args.profile_id
      )
    end
  end
end
