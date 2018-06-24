module Discogs
  class Album
    class PageData < Muffon::Base
      def call
        retrieve_album_page
      end

    private

      def retrieve_album_page
        return {} unless album_id.present?

        JSON.parse(album_page_response)
      end

      def album_page_response
        RestClient.get(
          "https://api.discogs.com/releases/#{album_id}"
        )
      end

      def album_id
        @album_id ||= retrieve_album_id
      end

      def retrieve_album_id
        search_results.find { |r| album_titles_match?(r) }.try(:[], 'id')
      end

      def search_results
        JSON.parse(search_response)['results'] || []
      end

      def search_response
        RestClient.get(
          'https://api.discogs.com/database/search',
          params: request_params
        ).body
      end

      def request_params
        {
          type:   'release',
          q:      full_album_title,
          key:    secrets[:discogs][:key],
          secret: secrets[:discogs][:secret]
        }
      end

      def format_string(string)
        string.downcase.gsub(' and ', ' & ').tr('*', '').sub(' - single', '')
      end

      def album_titles_match?(release)
        release_title(release).in?([full_album_title, various_album_title])
      end

      def release_title(release)
        format_string(release['title'])
      end

      def full_album_title
        format_string("#{@args.artist_name} - #{@args.album_title}")
      end

      def various_album_title
        format_string("Various - #{@args.album_title}")
      end
    end
  end
end
