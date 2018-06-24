module Muffon
  module Processor
    class Artist < Muffon::Base
      def call
        process_artist
      end

    private

      def process_artist
        return artist if artist.persisted?

        artist.tap { artist_attributes }
      end

      def artist
        @artist ||= ::Artist.with(name: artist_name)
      end

      def artist_name
        @args.artist_name || artist_data[:name]
      end

      def artist_data
        @artist_data ||= @args.artist || retrieve_artist_data
      end

      def retrieve_artist_data
        Muffon::Artist.call(artist_name: @args.artist_name)
      end

      def artist_attributes
        base_attributes
        extra_attributes
        artist.save
        ids_attributes
        artist.save
      end

      def base_attributes
        artist.name                   = if_present(:name)
        artist.image                  = if_present(:image)
        artist.description            = if_present(:description)
        artist.lastfm_listeners_count = if_present(:lastfm_listeners_count)
        artist.lastfm_plays_count     = if_present(:lastfm_plays_count)
      end

      def if_present(attribute)
        artist_data[attribute] || artist.send(attribute)
      end

      def extra_attributes
        artist.mbid                  = if_present(:mbid)
        artist.top_track_plays_count = if_present(:top_track_plays_count)
      end

      def top_track_plays_count
        return unless artist_data[:top_tracks].present?

        artist_data[:top_tracks].first[:lastfm_plays_count]
      end

      def ids_attributes
        artist.top_track_ids        |= top_track_ids
        artist.top_album_ids        |= top_album_ids
        artist.tag_ids              |= tag_ids
        artist.similar_artist_ids   |= similar_artist_ids
      end

      def top_track_ids
        Muffon::Processor::Tracks.call(
          tracks:    artist_data[:top_tracks],
          artist_id: artist.id
        ).pluck(:id)
      end

      def top_album_ids
        Muffon::Processor::Albums.call(
          albums:    artist_data[:top_albums],
          artist_id: artist.id
        ).pluck(:id)
      end

      def tag_ids
        Muffon::Processor::Tags.call(
          tags: artist_data[:tags]
        ).pluck(:id)
      end

      def similar_artist_ids
        Muffon::Processor::Artists.call(
          artists: artist_data[:similar_artists]
        ).pluck(:id)
      end
    end
  end
end
