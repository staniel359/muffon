module Muffon
  module Processor
    class Album < Muffon::Base
      def call
        process_album
      end

    private

      def process_album
        return {} unless valid_album?
        return album if album.persisted?

        album.tap { album_attributes }
      end

      def valid_album?
        muffon_album_data.present?
      end

      def muffon_album_data
        @muffon_album_data ||= Muffon::Album.call(
          artist_name: @args.artist_name,
          album_title: @args.album_title
        )
      end

      def album
        @album ||= ::Album.with(
          title:     album_title,
          artist_id: artist_id
        )
      end

      def album_title
        @args.album_title || album_data[:title]
      end

      def album_data
        @album_data ||= @args.album || muffon_album_data
      end

      def artist_id
        @args.artist_id || artist.id
      end

      def artist
        Muffon::Processor::Artist.call(
          artist_name: @args.artist_name,
          artist:      artist_data
        )
      end

      def artist_data
        album_data[:artist] unless @args.artist_name.present?
      end

      def album_attributes
        base_attributes
        extra_attributes
        album.save
        ids_attributes
        album.save
      end

      def base_attributes
        album.title                  = if_present(:title)
        album.cover                  = if_present(:cover)
        album.lastfm_listeners_count = if_present(:lastfm_listeners_count)
        album.lastfm_plays_count     = if_present(:lastfm_plays_count)
        album.description            = if_present(:description)
      end

      def if_present(attribute)
        album_data[attribute] || album.send(attribute)
      end

      def extra_attributes
        album.mbid          = if_present(:mbid)
        album.release_date  = if_present(:release_date)
        album.official      = if_present(:official)
        album.bandcamp_link = if_present(:bandcamp_link)
      end

      def ids_attributes
        album.track_ids |= track_ids
        album.tag_ids   |= tag_ids
        album.label_ids |= label_ids
      end

      def track_ids
        Muffon::Processor::Tracks.call(
          tracks:    album_data[:tracks],
          artist_id: artist_id,
          album_id:  album.id
        ).pluck(:id)
      end

      def tag_ids
        Muffon::Processor::Tags.call(
          tags: album_data[:tags]
        ).pluck(:id)
      end

      def label_ids
        Muffon::Processor::Labels.call(
          labels: album_data[:labels]
        ).pluck(:id)
      end
    end
  end
end
