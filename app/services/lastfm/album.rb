module LastFM
  class Album < LastFM::Base
    def call
      retrieve_album_data
    end

  private

    def retrieve_album_data
      return {} unless parsed_album_data.present?

      process_album_data
    end

    def process_album_data
      base_attributes.merge(extra_attributes)
    end

    def base_attributes
      {
        title:                  parsed_album_data['name'],
        artist:                 album_artist_data,
        cover:                  parsed_album_data['image'][3]['#text'].presence,
        lastfm_listeners_count: parsed_album_data['listeners'].to_i,
        lastfm_plays_count:     parsed_album_data['playcount'].to_i
      }
    end

    def parsed_album_data
      @parsed_album_data ||= JSON.parse(album_response)['album']
    end

    def album_response
      RestClient.get(api_link, params: request_params)
    end

    def request_params
      {
        method:      'album.getInfo',
        artist:      @args.artist_name,
        album:       @args.album_title,
        api_key:     api_key,
        format:      'json',
        autocorrect: 1
      }
    end

    def album_artist_data
      { name: parsed_album_data['artist'] }
    end

    def extra_attributes
      {
        mbid:        parsed_album_data['mbid'],
        tracks:      tracks_data,
        tags:        tags_data,
        description: description
      }
    end

    def tracks_data
      parsed_album_data['tracks']['track'].map { |t| process_track(t) }
    end

    def process_track(track)
      {
        title:    track['name'],
        duration: track['duration'].to_i,
        artist:   track_artist_data(track)
      }
    end

    def track_artist_data(track)
      {
        name: track['artist']['name'],
        mbid: track['artist']['mbid']
      }
    end

    def tags_data
      parsed_album_data['tags']['tag'].map { |t| t['name'] }
    end

    def description
      return unless parsed_album_data['wiki'].present?

      parsed_album_data['wiki']['content'].split(
        %r{<a href="http(s?)://www.last.fm/music/}
      )[0]&.rstrip
    end
  end
end
