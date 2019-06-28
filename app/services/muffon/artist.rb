module Muffon
  class Artist < Muffon::Base
    def call
      retrieve_artist_data
    end

  private

    def retrieve_artist_data
      [
        artist_data[:base], image, top_tracks_hash,
        top_albums_hash, similar_artists_hash
      ].inject(:merge)
    end

    def artist_data
      @artist_data ||= process_artist_data
    end

    def process_artist_data
      services_hash.values # preload constants
      threads = []
      artist_data_hash = scopes_list.each_with_object({}) do |s, h|
        threads << Thread.new { h.merge!(s.to_sym => call_service(s)) }
      end
      concurrent_loader { threads.each(&:join) }
      artist_data_hash
    end

    def scopes_list
      %i[base image top_tracks top_albums similar_artists]
    end

    def call_service(scope)
      services_hash[scope].call(
        artist_name: @args.artist_name,
        limit: limits[scope]
      )
    end

    def services_hash
      {
        base: LastFM::Artist,
        image: LastFM::Artist::Images,
        top_tracks: ::LastFM::Artist::Tracks,
        top_albums: ::LastFM::Artist::Albums,
        similar_artists: ::LastFM::Artist::SimilarArtists
      }
    end

    def limits
      {
        top_tracks: 10,
        top_albums: 6,
        similar_artists: 6
      }
    end

    def image
      {
        image: artist_data.dig(:image, :images, 0)&.sub(
          'avatar170s', '600x600'
        )
      }
    end

    def top_tracks_hash
      { top_tracks: top_tracks_sorted }
    end

    def top_tracks_sorted
      return [] unless artist_data[:top_tracks].present?

      artist_data[:top_tracks][:tracks].sort_by do |t|
        t[:lastfm_plays_count]
      end.reverse
    end

    def top_albums_hash
      { top_albums: top_albums_sorted }
    end

    def top_albums_sorted
      return [] unless artist_data[:top_albums].present?

      artist_data[:top_albums][:albums].sort_by do |a|
        a[:lastfm_plays_count]
      end.reverse
    end

    def similar_artists_hash
      { similar_artists: artist_data[:similar_artists][:artists] }
    end
  end
end
