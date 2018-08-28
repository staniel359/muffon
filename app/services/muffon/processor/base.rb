module Muffon
  module Processor
    class Base < Muffon::Base
    private

      def init_artist(artist_data)
        ::Artist.with(
          name: artist_data[:name]
        ).first_or_initialize
      end

      def update_artist(artist_data)
        init_artist(artist_data).tap { |a| a.update(artist_data) }
      end

      def init_track(track_data, artist_id = nil)
        ::Track.with(
          title:     track_data[:title],
          artist_id: artist_id || update_artist(track_data[:artist]).id
        ).first_or_initialize
      end

      def update_track(track_data, artist_id = nil)
        init_track(track_data, artist_id).tap do |t|
          t.update(track_data.except(:artist, :album))
        end
      end

      def init_album(album_data, artist_id = nil)
        ::Album.with(
          title:     album_data[:title],
          artist_id: artist_id || update_artist(album_data[:artist])
        ).first_or_initialize
      end

      def update_album(album_data, artist_id = nil)
        init_album(album_data, artist_id).tap do |a|
          a.update(album_data.except(:artist))
        end
      end

      def process_tag(tag_name)
        ::Tag.with(name: tag_name).first_or_create(name: tag_name)
      end

      def process_label(label_name)
        ::Label.with(name: label_name).first_or_create(name: label_name)
      end
    end
  end
end
