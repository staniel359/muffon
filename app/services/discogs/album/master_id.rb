module Discogs
  module Album
    class MasterId < Service
      def call
        process_master_id
      end

    private

      def process_master_id
        return unless search_results.present?
        return unless master_release.present?

        master_release['id']
      end

      def search_results
        return full_search_results if full_search_results.present?

        @search_results ||= search_without_artist_results
      end

      def full_search_results
        @full_search_results ||= JSON.parse(full_search_json)['results']
      end

      def full_search_json
        RestClient.get(
          'https://api.discogs.com/database/search'\
          "?release_title=#{CGI.escape(@args.title)}"\
          "&artist=#{CGI.escape(@args.artist_name)}"\
          "&per_page=100&key=#{ENV['DISCOGS_KEY']}"\
          "&secret=#{ENV['DISCOGS_SECRET']}"
        ).body
      end

      def search_without_artist_results
        JSON.parse(search_without_artist_json)['results']
      end

      def search_without_artist_json
        RestClient.get(
          'https://api.discogs.com/database/search'\
          "?release_title=#{CGI.escape(@args.title)}"\
          "&per_page=100&key=#{ENV['DISCOGS_KEY']}"\
          "&secret=#{ENV['DISCOGS_SECRET']}"
        ).body
      end

      def master_release
        return nil unless master_releases.present?
        return master_releases.first if master_releases.length == 1

        master_releases.find do |release|
          release['title'].match(matched_album_title)
        end
      end

      def master_releases
        @master_releases ||= search_results.select do |release|
          release['type'] == 'master'
        end
      end

      def matched_album_title
        /(^#{artist_name} - #{album_title}$)/i
      end

      def artist_name
        Regexp.quote(CGI.unescape(@args.artist_name))
      end

      def album_title
        Regexp.quote(CGI.unescape(@args.title))
      end
    end
  end
end
