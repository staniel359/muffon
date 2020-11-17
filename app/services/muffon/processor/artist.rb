module Muffon
  module Processor
    class Artist < Muffon::Processor::Base
      def call
        process_artist
      end

    private

      def process_artist
        return unless artist_data[:name].present?

        artist.tap { |a| a.update(base_attributes) }.tap do |a|
          a.update(ids_attributes)
        end
      end

      def artist_data
        @artist_data ||= Muffon::Artist.call(@args)
      end

      def artist
        @artist ||= init_artist(artist_data)
      end

      def base_attributes
        artist_data.slice(
          :name, :image, :description, :mbid,
          :lastfm_listeners_count, :lastfm_plays_count
        )
      end

      def ids_attributes
        {
          top_track_ids: top_track_ids,
          top_album_ids: top_album_ids,
          tag_ids: tag_ids,
          similar_artist_ids: similar_artist_ids
        }
      end

      def top_track_ids
        artist_data[:top_tracks].map do |t|
          update_track(t, artist.id)
        end.pluck(:id)
      end

      def top_album_ids
        artist_data[:top_albums].map do |a|
          update_album(a, artist.id)
        end.pluck(:id)
      end

      def tag_ids
        artist_data[:tags].map { |t| process_tag(t) }.pluck(:id)
      end

      def similar_artist_ids
        artist_data[:similar_artists].map do |a|
          update_artist(a.except(:tags))
        end.pluck(:id)
      end
    end
  end
end
