module Muffon
  module Processor
    class Track < Muffon::Processor::Base
      def call
        process_track
      end

    private

      def process_track
        return unless track_data.present?

        update_track(track_attributes, artist_id).tap do |t|
          t.album_ids |= [album_id]
          t.tag_ids |= tag_ids
          t.save
        end
      end

      def track_data
        @track_data ||= Muffon::Track.call(@args)[:track]
      end

      def track_attributes
        track_data.slice(
          :title, :mbid, :duration, :lastfm_listeners_count,
          :lastfm_plays_count, :vk_id, :youtube_link, :wiki
        )
      end

      def artist_id
        update_artist(track_data[:artist]).id
      end

      def album_id
        return unless track_data[:album].present?

        update_album(track_data[:album]).id
      end

      def tag_ids
        track_data[:tags].map { |t| process_tag(t).id }
      end
    end
  end
end
