module LastFM
  module User
    class Plays < LastFM::Base
      def call
        retrieve_plays_data
      end

    private

      def retrieve_plays_data
        {
          total_count: parsed_plays.dig('@attr', 'total').to_i,
          pages_count: parsed_plays.dig('@attr', 'totalPages').to_i,
          plays:       formatted_plays
        }
      end

      def formatted_plays
        parsed_plays['track'].map { |p| process_play(p) }.compact
      end

      def parsed_plays
        @parsed_plays ||= JSON.parse(plays_response)['recenttracks']
      end

      def plays_response
        RestClient.get(api_link, params: request_params)
      end

      def request_params
        {
          method:   'user.getRecentTracks',
          user:     @args.lastfm_id,
          page:     page,
          limit:    200,
          api_key:  api_key,
          format:   'json',
          extended: 1
        }
      end

      def process_play(play)
        return if play.dig('@attr', 'nowplaying') == 'true'

        {
          title:      play['name'],
          mbid:       play['mbid'].presence,
          created_at: created_at(play),
          artist:     artist_data(play),
          album:      album_data(play)
        }
      end

      def created_at(play)
        Time.at((play['date']['uts']).to_i)
      end

      def artist_data(play)
        {
          name:  play['artist']['name'],
          mbid:  play['artist']['mbid'].presence,
          image: play['artist']['image'][3]['#text'].presence
        }
      end

      def album_data(play)
        {
          title:  play['album']['#text'],
          mbid:   play['album']['mbid'].presence,
          cover:  play['image'][3]['#text'].presence
        }
      end
    end
  end
end
