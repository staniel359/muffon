module Muffon
  module Radio
    class Artist < Muffon::Base
      SIMILAR_ARTISTS_COUNT = 20
      TOP_TRACKS_COUNT = 20

      def call
        { track: track_data_hash }
      end

    private

      def track_data_hash
        return {} unless can_proceed?

        sample_track.except(:mbid).tap do |h|
          h[:link] = track_link
          h[:youtube_link] = youtube_link
          h[:artist][:image] = artist_image
          h[:radio_artist] = radio_artist_name
        end
      end

      def can_proceed?
        @args.artist_name.present? &&
          similar_artists_list.present?
      end

      def similar_artists_list
        similar_artists_data[:similar_artists]
      end

      def similar_artists_data
        @similar_artists_data ||=
          retrieve_similar_artists_data
      end

      def retrieve_similar_artists_data
        LastFM::Artist::SimilarArtists::List.call(
          artist_name: @args.artist_name,
          limit: SIMILAR_ARTISTS_COUNT
        )
      rescue JSON::ParserError
        retry
      end

      def track_link
        @track_link ||=
          VK::Track.call(vk_id: track_ids_list[0])
      end

      def track_ids_list
        VK::Tracks.call(
          artist_name: sample_track.dig(:artist, :name),
          track_title: sample_track[:title]
        )
      end

      def sample_track
        @sample_track ||= image_track_data[:tracks].sample
      end

      def image_track_data
        @image_track_data ||= retrieve_image_track_data
      end

      def retrieve_image_track_data
        services.each_with_object({}) do |s, h|
          h.merge!(call_service(s))
        end
      end

      def services
        [LastFM::Artist::Tracks, LastFM::Artist::Images]
      end

      def call_service(service)
        service.call(
          artist_name: sample_artist_name,
          limit: TOP_TRACKS_COUNT
        )
      rescue JSON::ParserError
        retry
      end

      def sample_artist_name
        @sample_artist_name ||= similar_artists_list.sample
      end

      def youtube_link
        return if track_link.present?

        YouTube::Link.call(
          artist_name: sample_track.dig(:artist, :name),
          track_title: sample_track[:title]
        )
      end

      def artist_image
        return unless artist_images.present?

        artist_images.first(5).sample.sub(
          'avatar170s', '600x600'
        )
      end

      def artist_images
        @artist_images ||= image_track_data[:images]
      end

      def radio_artist_name
        { name: similar_artists_data.dig(:artist, :name) }
      end
    end
  end
end
