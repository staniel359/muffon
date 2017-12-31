module Discogs
  module Album
    class Details < Service
      def call
        return {} unless discogs_master_id.present?

        process_details
      end

    private

      def discogs_master_id
        @discogs_master_id ||= Discogs::Album::MasterId.call(
          artist_name: @args.artist_name,
          title: @args.title
        )
      end

      def process_details
        @args.h.discogs_main_id = discogs_main_id
        @args.h.format = format
        @args.h.released_at = release_page['released']
        @args.h.labels |= [labels]
        @args.h.discogs_ids |= [discogs_ids]
      end

      def discogs_main_id
        @discogs_main_id ||= JSON.parse(
          discogs_master_json
        )['main_release']
      end

      def discogs_master_json
        RestClient.get(
          "https://api.discogs.com/masters/#{discogs_master_id}"
        ).body
      end

      def format
        release_page['formats'][0]['descriptions'].join(', ')
      end

      def release_page
        @release_page ||= JSON.parse(discogs_release_json)
      end

      def discogs_release_json
        RestClient.get(
          "https://api.discogs.com/releases/#{discogs_main_id}"
        ).body
      end

      def labels
        release_page['labels'].map { |label| create_label(label) }
      end

      def create_label(label)
        Label.where(name: label['name']).first_or_create(
          discogs_id: label['id']
        ).id
      end

      def discogs_ids
        Discogs::Album::Ids.call(
          discogs_master_id: discogs_master_id
        )
      end
    end
  end
end
