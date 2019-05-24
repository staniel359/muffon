module LastFM
  class Artist < LastFM::Base
    def call
      retrieve_artist_data
    end

  private

    def retrieve_artist_data
      return {} unless parsed_artist_data.present?

      base_data.merge!(extra_data)
    end

    def parsed_artist_data
      @parsed_artist_data ||= JSON.parse(artist_response)['artist']
    end

    def artist_response
      RestClient.get(lastfm_api_link, params: request_params).body
    end

    def request_params
      {
        method: 'artist.getInfo',
        artist: @args.artist_name,
        api_key: lastfm_api_key,
        format: 'json',
        autocorrect: 1
      }
    end

    def base_data
      {
        name: parsed_artist_data['name'],
        mbid: parsed_artist_data['mbid'],
        image: parsed_artist_data['image'][3]['#text'],
        lastfm_listeners_count: lastfm_listeners_count,
        lastfm_plays_count: lastfm_plays_count
      }
    end

    def lastfm_listeners_count
      parsed_artist_data['stats']['listeners'].to_i
    end

    def lastfm_plays_count
      parsed_artist_data['stats']['playcount'].to_i
    end

    def extra_data
      {
        tags: tags,
        description: description
      }
    end

    def tags
      parsed_artist_data['tags']['tag'].map { |t| t['name'] }
    end

    def description
      parsed_artist_data['bio']['content'].split(
        %r{<a href="http(s?)://www.last.fm/music/}
      )[0]&.rstrip
    end
  end
end
