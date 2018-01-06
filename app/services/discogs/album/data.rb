module Discogs
  module Album
    class Data < Service
      def call
        process_album_data
      end

    private

      def process_album_data
        return {} unless master_id.present? || main_release_id.present?

        {
          discogs_main_id: main_release_id,
          format: format,
          released_at: release_page['released'],
          labels: labels
        }
      end

      def main_release_id
        return unless search_results.present?
        return process_main_release_id if master_id.present?

        search_results.first['id']
      end

      def process_main_release_id
        JSON.parse(
          RestClient.get(
            "https://api.discogs.com/masters/#{master_id}"
          ).body
        )['main_release']
      end

      def master_id
        return unless search_results.present?
        return unless master_release.present?

        master_release['id']
      end

      def search_results
        return full_search_results if full_search_results.present?

        @search_results ||= search_without_artist_results
      end

      def full_search_results
        @full_search_results ||= JSON.parse(
          RestClient.get(full_search_link).body
        )['results']
      end

      def full_search_link
        'https://api.discogs.com/database/search'\
        "?release_title=#{query_name(@args.album_title)}"\
        "&artist=#{query_name(@args.artist_name)}"\
        "&per_page=100&key=#{ENV['DISCOGS_KEY']}"\
        "&secret=#{ENV['DISCOGS_SECRET']}"
      end

      def search_without_artist_results
        JSON.parse(
          RestClient.get(search_without_artist_link).body
        )['results']
      end

      def search_without_artist_link
        'https://api.discogs.com/database/search'\
        "?release_title=#{query_name(@args.album_title)}"\
        "&per_page=100&key=#{ENV['DISCOGS_KEY']}"\
        "&secret=#{ENV['DISCOGS_SECRET']}"
      end

      def master_release
        return unless master_releases.present?
        return master_releases.first if master_releases.length == 1

        master_releases.find do |release|
          release['title'].match(matched_album_title)
        end
      end

      def master_releases
        search_results.select do |release|
          release['type'] == 'master' &&
            release['format'].include?("Album") &&
            release['format'].exclude?("Unofficial Release")
        end
      end

      def matched_album_title
        /(^#{regex_artist_name} - #{regex_album_title}$)/i
      end

      def regex_artist_name
        Regexp.quote(CGI.unescape(@args.artist_name))
      end

      def regex_album_title
        Regexp.quote(CGI.unescape(@args.album_title))
      end

      def format
        release_page['formats'][0]['descriptions'].join(', ')
      end

      def release_page
        @release_page ||= JSON.parse(discogs_release_json)
      end

      def discogs_release_json
        RestClient.get("https://api.discogs.com/releases/#{main_release_id}").body
      end

      def labels
        release_page['labels'].uniq.map { |label| create_label(label) }
      end

      def create_label(label)
        Label.where(
          name: label['name']
        ).first_or_create(
          discogs_id: label['id']
        ).id
      end
    end
  end
end
