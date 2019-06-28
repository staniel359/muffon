module Muffon
  class Track < Muffon::Base
    def call
      { track: track_data }
    end

  private

    def track_data
      return {} unless can_proceed?

      retrieve_track_data.reject { |_, v| v.nil? }
    end

    def can_proceed?
      [@args.artist_name, @args.track_title].all?(&:present?)
    end

    def retrieve_track_data
      threads = []
      track_data_hash = {}
      data_methods_list.each do |m|
        threads << Thread.new do
          track_data_hash.merge!(send(m))
        end
      end
      concurrent_loader { threads.each(&:join) }
      track_data_hash
    end

    def data_methods_list
      %w[lastfm_data vk_id youtube_link]
    end

    def lastfm_data
      LastFM::Track.call(@args)[:track]
    end

    def vk_id
      { vk_id: VK::Tracks.call(@args)[0] }
    end

    def youtube_link
      { youtube_link: YouTube::Link.call(@args) }
    end
  end
end
