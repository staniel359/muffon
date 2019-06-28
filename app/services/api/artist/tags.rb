module API
  class Artist
    class Tags < Muffon::Processor::Base
      def call
        retrieve_tags
      end

    private

      def retrieve_tags
        tags_data.map { |t| process_tag(t[:name]) }
      end

      def tags_data
        LastFM::Tags.call(
          model_name: 'artist',
          artist_name: @args.artist_name
        ).first(limit)
      end

      def limit
        @args.limit || 10
      end
    end
  end
end
