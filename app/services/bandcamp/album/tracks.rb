module Bandcamp
  module Album
    class Tracks < Service
      def call
        process_album_tracks
      end

    private

      def process_album_tracks
        return [] unless album_tracklist.present?

        tracks = []
        album_tracklist.map do |t|
          tracks << {
            'title' => t[:title],
            'bandcamp_link' => t.try(:[], :file).try(:[], :'mp3-128')
          }
        end
        tracks
      end

      def album_tracklist
        return unless album_tracklist_hash.present?

        eval(album_tracklist_hash[1].gsub('null', 'nil'))
      end

      def album_tracklist_hash
        album_script.to_s.match(/trackinfo: (\[.+\])/)
      end

      def album_script
        @args.page.css('script').find do |s|
          s.to_s.include?('Control.registerController( "/"')
        end
      end
    end
  end
end
