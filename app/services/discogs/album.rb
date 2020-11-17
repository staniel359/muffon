module Discogs
  class Album < Muffon::Base
    def call
      album_data
    end

  private

    def album_data
      return {} unless album_id.present?

      { album: album_data_hash }
    end

    def album_id
      @album_id ||= Discogs::Album::ID.call(@args).dig(:album, :id)
    end

    def album_data_hash
      {
        title: parsed_page['title'],
        artist: { name: parsed_page['artists_sort'] },
        release_date: parsed_page['released'],
        labels: labels,
        tracks: tracks
      }
    end

    def parsed_page
      @parsed_page ||= JSON.parse(album_page_response)
    end

    def album_page_response
      RestClient.get(
        "https://api.discogs.com/releases/#{album_id}"
      )
    end

    def labels
      parsed_page['labels'].map { |l| l['name'] }.uniq
    end

    def tracks
      only_tracks_no_headings.map { |t| process_track(t) }
    end

    def only_tracks_no_headings
      parsed_page['tracklist'].reject do |t|
        t['type_'] == 'heading'
      end
    end

    def process_track(track)
      {
        title: track['title'],
        duration: convert_to_seconds(track['duration']),
        artist: artist_data(track)
      }
    end

    def artist_data(track)
      { name: track_artist_name(track) || parsed_page['artists_sort'] }
    end

    def track_artist_name(track)
      return unless track['artists'].present?

      track['artists'].map { |a| artists_string(a) }.join(' ')
    end

    def artists_string(artist)
      "#{artist['name']}#{' ' if artist['join'] == '&'}#{artist['join']}"
    end
  end
end
