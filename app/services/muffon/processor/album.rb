module Muffon
  module Processor
    class Album < Muffon::Processor::Base
      def call
        process_album
      end

    private

      def process_album
        return unless album_data.present?

        album.tap { |a| a.update(base_attributes) }.tap do |a|
          a.update(ids_attributes)
        end
      end

      def album_data
        @album_data ||= Muffon::Album.call(@args)
      end

      def album
        @album ||= init_album(album_data)
      end

      def base_attributes
        album_data.slice(
          :title, :cover, :lastfm_listeners_count,
          :lastfm_plays_count, :description, :mbid,
          :release_date, :official, :bandcamp_link
        )
      end

      def ids_attributes
        {
          track_ids: track_ids,
          tag_ids: tag_ids,
          label_ids: label_ids
        }
      end

      def track_ids
        album_data[:tracks].map { |t| process_track(t) }.pluck(:id)
      end

      def process_track(track_data)
        update_track(track_data, album.artist_id).tap do |attr|
          attr.album_ids |= [album.id].compact
          attr.save!
        end
      end

      def tag_ids
        album_data[:tags].map { |t| process_tag(t) }.pluck(:id)
      end

      def label_ids
        album_data[:labels].map { |l| process_label(l) }.pluck(:id)
      end
    end
  end
end
