module Discogs
  module Album
    class Ids < Service
      def call
        process_album_ids
      end

    private

      def process_album_ids
        JSON.parse(
          RestClient.get(
            'https://api.discogs.com/masters/'\
            "#{@args.discogs_master_id}/versions"
          ).body
        )['versions'].pluck('id')
      end
    end
  end
end
