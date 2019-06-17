module LastFM
  class Track
    class SimilarTracks < LastFM::Base
      ARRAY_LIMIT = 25

      def call
        { similar_tracks: similar_tracks_data }
      end

    private

      def similar_tracks_data
        return {} unless can_proceed?

        tracks_paginated.map { |t| format_track(t) }
      end

      def can_proceed?
        [
          @args.artist_name, @args.track_title
        ].all?(&:present?) && parsed_response.present?
      end

      def parsed_response
        @parsed_response ||=
          JSON.parse(response)['similartracks']
      end

      def response
        RestClient.get(
          lastfm_api_link, params: request_params
        )
      end

      def request_params
        {
          method: 'track.getsimilar',
          track: @args.track_title,
          artist: @args.artist_name,
          autocorrect: 1,
          limit: (@args.limit || 5),
          api_key: lastfm_api_key,
          format: 'json'
        }
      end

      def tracks_paginated
        parsed_response['track'][array_offset, array_limit] || []
      end

      def array_limit
        ARRAY_LIMIT
      end

      def format_track(track)
        {
          title: track['name'],
          artist: artist_data(track),
          lastfm_listeners_count: track['playcount'],
          mbid: track['mbid'],
          duration: track['duration']
        }
      end

      def artist_data(track)
        {
          name: track.dig('artist', 'name'),
          image: artist_image(track),
          mbid: track.dig('artist', 'mbid')
        }
      end

      def artist_image(track)
        track.dig('image', 3, '#text').sub(
          '300x300', '600x600'
        )
      end
    end
  end
end
