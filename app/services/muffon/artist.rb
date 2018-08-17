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
      artist_data_hash = scopes_list.each_with_object({}) do |s, h|
        threads << Thread.new { h.merge!(s.to_sym => call_service(s)) }
      end
      concurrent_loader { threads.each(&:join) }
      artist_data_hash
    end

    def scopes_list
      %w[base top_tracks top_albums]
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
      return {} unless artist_data[:top_tracks][:data].present?

      {
        top_tracks:            artist_data[:top_tracks][:data],
        top_track_plays_count: top_track_plays_count
      }
    end

    def top_track_plays_count
      artist_data[:top_tracks][:data].first[:lastfm_plays_count]
    end

    def top_albums_hash
      return {} unless artist_data[:top_albums].present?

      { top_albums: artist_data[:top_albums][:data] }
    end
  end
end
