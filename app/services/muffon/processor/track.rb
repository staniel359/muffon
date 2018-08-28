module Muffon
  module Processor
    class Track < Muffon::Processor::Base
      def call
        process_track
      end

    private

      def process_track
        track.tap { track_attributes }
      end

      def track
        @track ||= ::Track.with(
          title:     track_data[:title],
          artist_id: artist_id
        )
      end

      def track_data
        @track_data ||= @args.track || custom_track_data
      end

      def artist_id
        @args.artist_id || artist.id
      end

      def artist
        Muffon::Processor::Artist.call(artist: artist_data)
      end

      def artist_data
        track_data[:artist] || custom_artist_data
      end

      def track_attributes
        base_attributes
        extra_attributes
        ids_attributes
        track.save!
      end

      def base_attributes
        track.title                ||= if_present(:title)
        track.duration               = if_present(:duration)
        track.lastfm_listeners_count = if_present(:lastfm_listeners_count)
        track.lastfm_plays_count     = if_present(:lastfm_plays_count)
      end

      def if_present(attribute)
        track_data[attribute] || track.send(attribute)
      end

      def extra_attributes
        track.mbid          = if_present(:mbid)
        track.bandcamp_link = if_present(:bandcamp_link)
      end

      def ids_attributes
        track.album_ids |= album_ids
      end

      def album_ids
        @args.album_ids || albums.pluck(:id)
      end

      def albums
        Muffon::Processor::Albums.call(
          artist_id: artist_id,
          albums:    track_data[:albums]
        )
      end
    end
  end
end
