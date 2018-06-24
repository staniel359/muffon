module Discogs
  class Album < Muffon::Base
    def call
      process_albums_data
    end

  private

    def process_albums_data
      return {} unless album_page.present?

      process_album_data
    end

    def album_page
      @album_page ||= Discogs::Album::PageData.call(
        album_title: @args.album_title,
        artist_name: @args.artist_name
      )
    end

    def process_album_data
      {
        artist_name:  album_page['artists_sort'],
        title:        album_page['title'],
        release_date: album_page['released'],
        labels:       labels,
        tracks:       tracks
      }
    end

    def labels
      album_page['labels'].uniq.map { |l| l['name'] }.uniq
    end

    def tracks
      album_page['tracklist'].map { |t| process_track(t) }
    end

    def process_track(track)
      {
        title:    track['title'],
        duration: duration(track),
        artist:   artist(track)
      }
    end

    def duration(track)
      track['duration'].split(':').map(&:to_i).inject { |m, s| m * 60 + s }
    end

    def artist(track)
      return unless track['artists'].present?

      track['artists'].map { |a| artists_string(a) }.join(' ')
    end

    def artists_string(artist)
      "#{artist['name']}#{' ' if artist['join'] == '&'}#{artist['join']}"
    end
  end
end
