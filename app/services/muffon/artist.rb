module Muffon
  class Artist < Muffon::Base
    def call
      retrieve_artist_data
    end

  private

    def retrieve_artist_data
      [
        artist_data[:base], top_tracks_hash, top_albums_hash
      ].inject(:merge)
    end

    def artist_data
      @artist_data ||= process_artist_data
    end

    def process_artist_data
      threads = []
      data = %w[base top_tracks top_albums].each_with_object({}) do |s, h|
        threads << Thread.new { h.merge!(s.to_sym => call_service(s)) }
      end
      threads.each(&:join)
      data
    end

    def call_service(scope)
      services_hash[scope].call(
        artist_name: @args.artist_name,
        limit: limits[scope]
      )
    end

    def services_hash
      {
        'base'       => LastFM::Artist,
        'top_tracks' => LastFM::Artist::Tracks,
        'top_albums' => LastFM::Artist::Albums
      }
    end

    def limits
      { 'top_tracks' => 10, 'top_albums' => 4 }
    end

    def top_tracks_hash
      return {} unless artist_data[:top_tracks].present?

      { top_tracks: artist_data[:top_tracks] }
    end

    def top_albums_hash
      return {} unless artist_data[:top_albums].present?

      { top_albums: artist_data[:top_albums][:data] }
    end
  end
end
