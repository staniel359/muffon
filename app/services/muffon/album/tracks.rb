module Muffon
  class Album
    class Tracks < Muffon::Base
      def call
        retrieve_album_tracks
      end

    private

      def retrieve_album_tracks
        select_of_tracks.map do |track|
          {
            title: track[:title],
            artist: track[:artist],
            duration: track[:duration],
            bandcamp_link: track_bandcamp_link(track)
          }
        end
      end

      def select_of_tracks
        music_brainz_tracks || lastfm_page_tracks ||
          lastfm_data_tracks || bandcamp_tracks ||
          discogs_tracks || []
      end

      def music_brainz_tracks
        resources_data.dig(
          :music_brainz, :album, :tracks
        ).presence
      end

      def resources_data
        @args.resources_data
      end

      def lastfm_page_tracks
        resources_data.dig(
          :lastfm_page, :album, :tracks
        ).presence
      end

      def lastfm_data_tracks
        lastfm_data[:tracks].presence
      end

      def lastfm_data
        @args.lastfm_data
      end

      def bandcamp_tracks
        resources_data.dig(
          :bandcamp, :album, :tracks
        ).presence
      end

      def discogs_tracks
        resources_data.dig(
          :discogs, :album, :tracks
        ).presence
      end

      def track_bandcamp_link(track)
        return track[:link] if track[:link].present?
        return unless bandcamp_tracks.present?

        bandcamp_tracks.find do |b|
          titles_match?(b[:title], track[:title])
        end&.dig(:link)
      end

      def titles_match?(first, second)
        formatted_string(first) == formatted_string(second)
      end

      def formatted_string(string)
        string.downcase.tr('’', "'").tr(',', '').tr('-', ' ')
      end
    end
  end
end
