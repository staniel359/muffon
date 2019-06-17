module LastFM
  class Track < LastFM::Base
    DURATION_DIVISION = 1_000

    def call
      { track: track_data }
    end

  private

    def track_data
      return {} unless can_proceed?

      track_data_hash
    end

    def can_proceed?
      [
        @args.artist_name, @args.track_title
      ].all?(&:present?) && parsed_response.present?
    end

    def parsed_response
      @parsed_response ||= JSON.parse(response)['track']
    end

    def response
      RestClient.get(
        lastfm_api_link, params: request_params
      )
    end

    def request_params
      {
        method: 'track.getInfo',
        track: @args.track_title,
        artist: @args.artist_name,
        autocorrect: 1,
        api_key: lastfm_api_key,
        format: 'json'
      }
    end

    def track_data_hash
      base_track_data.merge(additional_track_data)
    end

    def base_track_data
      {
        title: parsed_response['name'],
        artist: artist_data
      }
    end

    def artist_data
      { name: parsed_response.dig('artist', 'name') }
    end

    def additional_track_data
      {
        mbid: parsed_response['mbid'],
        duration: duration,
        lastfm_listeners_count: parsed_response['listeners'].to_i,
        lastfm_plays_count: parsed_response['playcount'].to_i,
        album: album_data,
        tags: tags,
        wiki: wiki
      }
    end

    def duration
      parsed_response['duration'].to_i / DURATION_DIVISION
    end

    def album_data
      return {} unless parsed_response['album'].present?

      {
        title: parsed_response.dig('album', 'title'),
        artist: album_artist_data,
        cover: album_cover,
        mbid: parsed_response.dig('album', 'mbid')
      }
    end

    def album_artist_data
      { name: parsed_response.dig('album', 'artist') }
    end

    def album_cover
      parsed_response.dig(
        'album', 'image', 3, '#text'
      ).sub('300x300', '600x600')
    end

    def tags
      parsed_response.dig(
        'toptags', 'tag'
      ).map { |t| t['name'] }
    end

    def wiki
      parsed_response.dig('wiki', 'content')&.split(
        %r{<a href="http(s?)://www.last.fm/music/}
      )&.first&.rstrip
    end
  end
end
