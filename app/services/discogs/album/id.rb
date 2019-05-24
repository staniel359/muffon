module Discogs
  class Album
    class ID < Muffon::Base
      def call
        album_data
      end

    private

      def album_data
        return {} unless matched_album.present?

        { album: album_data_hash }
      end

      def matched_album
        @matched_album ||= search_results.find do |r|
          album_titles_match?(r)
        end
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
          type: 'release',
          q: full_album_title,
          key: secrets[:discogs][:key],
          secret: secrets[:discogs][:secret]
        }
      end

      def full_album_title
        format_string("#{@args.artist_name} - #{@args.album_title}")
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

      def various_album_title
        format_string("Various - #{@args.album_title}")
      end

      def album_data_hash
        {
          title: matched_album['title'].split(' - ')[1],
          artist: { name: matched_album['title'].split(' - ')[0] },
          id: matched_album['id']
        }
      end
    end
  end
end
