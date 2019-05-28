module LastFM
  module User
    class Plays < LastFM::Base
      def call
        plays_data
      end

    private

      def plays_data
        return empty_hash unless
            [@args.lastfm_id, plays_response].all?(&:present?)

        {
          user: { name: parsed_page['@attr']['user'] },
          plays: formatted_plays,
          total_count: parsed_page.dig('@attr', 'total').to_i,
          pages_count: parsed_page.dig('@attr', 'totalPages').to_i
        }
      end

      def plays_response
        @plays_response ||=
          RestClient.get(lastfm_api_link, params: request_params)
      rescue RestClient::NotFound
        nil
      end

      def request_params
        {
          method: 'user.getRecentTracks',
          user: @args.lastfm_id,
          page: page,
          limit: 200,
          api_key: lastfm_api_key,
          format: 'json',
          extended: 1
        }
      end

      def empty_hash
        {
          user: { name: @args.lastfm_id },
          plays: {},
          total_count: 0,
          pages_count: 0
        }
      end

      def parsed_page
        @parsed_page ||= JSON.parse(plays_response)['recenttracks']
      end

      def formatted_plays
        parsed_page['track'].map { |p| process_play(p) }.compact
      end

      def process_play(play)
        return if play.dig('@attr', 'nowplaying') == 'true'

        {
          title: play['name'],
          artist: artist_data(play),
          album: album_data(play),
          created_at: Time.at((play['date']['uts']).to_i)
        }
      end

      def artist_data(play)
        {
          name: play['artist']['name'],
          image: play['artist']['image'][3]['#text'].presence
        }
      end

      def album_data(play)
        {
          title: play['album']['#text'],
          cover: play['image'][3]['#text'].presence,
          artist: artist_data(play)
        }
      end
    end
  end
end
