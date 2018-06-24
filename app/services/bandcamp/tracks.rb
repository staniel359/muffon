module Bandcamp
  class Tracks < Muffon::Base
    def call
      process_album_tracks
    end

  private

    def process_album_tracks
      return [] unless album_tracklist.present?

      album_tracklist.map { |t| process_track(t) }
    end

    def album_tracklist
      return unless album_tracklist_hash.present?

      YAML.safe_load(album_tracklist_hash[1])
    end

    def album_tracklist_hash
      album_script.to_s.match(/trackinfo: (\[.+\])/)
    end

    def album_script
      @args.script.find { |s| album_script?(s) }
    end

    def album_script?(script)
      script.to_s.include?('Control.registerController( "/"')
    end

    def process_track(track)
      {
        title:    track['title'],
        duration: track['duration'].ceil,
        link:     track.dig('file', 'mp3-128')
      }
    end
  end
end
