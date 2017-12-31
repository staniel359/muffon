module Discogs
  module Album
    class Ids < Service
      def call
        process_ids
      end

    private

      def process_ids
        JSON.parse(versions_json)['versions'].pluck('id')
      end

      def versions_json
        RestClient.get(
          'https://api.discogs.com/masters/'\
          "#{@args.discogs_master_id}/versions"
        ).body
      end
    end
  end
end
