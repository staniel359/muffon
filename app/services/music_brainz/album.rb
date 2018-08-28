module MusicBrainz
  class Album < Muffon::Base
    def call
      format_album_data
    end

  private

    def format_album_data
      return {} unless @args.mbid.present?

      {
        title:        album_data['title'],
        artist:       album_artist_data,
        mbid:         album_data['id'],
        release_date: album_data['date'],
        release_type: album_data['release-group']['primary-type'],
        tracks:       tracks,
        labels:       labels
      }
    end

    def album_data
      @album_data ||= JSON.parse(album_response)
    end

    def album_response
      RestClient.get(
        "http://musicbrainz.org/ws/2/release/#{@args.mbid}"\
        '?inc=artist-credits+labels+recordings+release-groups&fmt=json'
      )
    end

    def album_artist_data
      { name: album_data['artist-credit'][0]['name'] }
    end

    def tracks
      tracks_data.map { |t| process_track(t) }
    end

    def tracks_data
      album_data['media'][0]['tracks']
    end

    def process_track(track)
      {
        title:    track['title'],
        duration: track['length']&.div(1000),
        mbid:     track['id'],
        artist:   track_artist_data(track)
      }
    end

    def track_artist_data(track)
      {
        name: track['artist-credit'][0]['name'],
        mbid: track['artist-credit'][0]['artist']['id']
      }
    end

    def labels
      album_data['label-info'].map { |l| l['label']['name'] }
    end
  end
end
