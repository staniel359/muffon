module Discogs
  module Artist
    class Ids < Service
      def call
        process_discogs_ids
      end

    private

      def process_discogs_ids
        return artist_ids if artist_ids.present?

        in_variations? ? results.first['id'].to_a : []
      end

      def artist_ids
        return [] unless results.present?

        @artist_ids ||= matched_results.map { |artist| artist['id'] }
      end

      def results
        @results ||= JSON.parse(artists_json)['results']
      end

      def artists_json
        RestClient.get(
          'https://api.discogs.com/database/search'\
          "?q=#{CGI.escape(@args.name)}&type=artist"\
          "&per_page=100&key=#{ENV['DISCOGS_KEY']}"\
          "&secret=#{ENV['DISCOGS_SECRET']}"
        )
      end

      def matched_results
        results.select { |artist| matched_artist(artist) }
      end

      def matched_artist(artist)
        artist['title'].match(/(^#{Regexp.quote(@args.name)}(\s\(\d+\))?$)/i)
      end

      def in_variations?
        return false unless variations.present?

        variations.map(&:downcase).include?(@args.name.downcase)
      end

      def variations
        @variantions ||= JSON.parse(artist_json)['namevariations']
      end

      def artist_json
        RestClient.get(results.first['resource_url']).body
      end
    end
  end
end
