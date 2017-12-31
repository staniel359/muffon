module Lastfm
  module Album
    class Tracks < Service
      def call
        process_tracks
      end

    private

      def process_tracks
        tracks.map { |track| process_track(track) }
      end

      def tracks
        return lastfm_tracks if lastfm_tracks.present?

        discogs_tracks
      end

      def lastfm_tracks
        @lastfm_tracks ||= @args.album_data['tracks']['track']
      end

      def discogs_tracks
        return [] unless discogs_tracks_page.present?

        JSON.parse(discogs_tracks_page)['tracklist']
      end

      def discogs_tracks_page
        return unless @args.discogs_main_id.present?

        RestClient.get(
          "https://api.discogs.com/releases/#{@args.discogs_main_id}"
        ).body
      end

      def process_track(track)
        ::Track.where(
          title: (track['name'] || track['title']),
          artist_id: @args.artist_id
        ).first_or_initialize.tap do |h|
          h.mbid = track['mbid']
          h.albums |= [@args.album_id]
          h.save
        end.id
      end
    end
  end
end
