module Muffon
  module Processor
    class Tagging < Muffon::Base
      def call
        process_tagging
      end

    private

      def process_tagging
        send(@args.model_name).taggings.where(
          profile_tag_id: @args.profile_tag_id
        ).first_or_create
      end

      def artist
        Muffon::Processor::Artist.call(artist: @args.tagging)
      end

      def album
        Muffon::Processor::Album.call(album: @args.tagging)
      end

      def track
        Muffon::Processor::Track.call(track: @args.tagging)
      end
    end
  end
end
