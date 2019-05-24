module LastFM
  class Album < LastFM::Base
    def call
      album_data
    end

  private

    def album_data
      return {} unless parsed_page.present?

      base_attributes.merge(extra_attributes)
    end

    def parsed_page
      @parsed_page ||= JSON.parse(album_response)['album']
    end

    def album_response
      RestClient.get(lastfm_api_link, params: request_params)
    end

    def request_params
      {
        method: 'album.getInfo',
        artist: @args.artist_name,
        album: @args.album_title,
        api_key: lastfm_api_key,
        format: 'json',
        autocorrect: 1
      }
    end

    def base_attributes
      {
        title: parsed_page['name'],
        artist: { name: parsed_page['artist'] },
        cover: parsed_page['image'][3]['#text'].presence,
        lastfm_listeners_count: parsed_page['listeners'].to_i,
        lastfm_plays_count: parsed_page['playcount'].to_i
      }
    end

    def extra_attributes
      {
        mbid: parsed_page['mbid'],
        tags: format_tags,
        description: description,
        tracks: format_tracks
      }
    end

    def format_tags
      parsed_page['tags']['tag'].map { |t| t['name'] }
    end

    def description
      return unless parsed_page['wiki'].present?

      parsed_page['wiki']['content'].split(
        %r{<a href="http(s?)://www.last.fm/music/}
      )[0]&.rstrip
    end

    def format_tracks
      parsed_page['tracks']['track'].map { |t| format_track(t) }
    end

    def format_track(track)
      {
        title: track['name'],
        duration: track['duration'].to_i,
        artist: { name: track['artist']['name'] }
      }
    end
  end
end
