module LastFM
  class Tag
    class Albums < LastFM::Base
      def call
        retrieve_albums_data
      end

    private

      def retrieve_albums_data
        return {} unless @args.tag_name.present?
        return {} unless albums_page_response.present?

        {
          data:        albums_data,
          total_count: total_count
        }
      end

      def albums_page_response
        @albums_page_response ||= begin
          RestClient.get("#{tag_page_link}/albums?page=#{page}")
        rescue RestClient::NotFound
          nil
        end
      end

      def albums_data
        LastFM::Albums.call(
          albums: album_titles_artists.first(@args.limit || 20)
        )
      end

      def album_titles_artists
        [
          albums_list.css('.album-grid-item-artist').css('a').map(&:text),
          albums_list.css('.album-grid-item-title').css('a').map(&:text)
        ].transpose
      end

      def albums_list
        parsed_albums_page.css('.album-grid-item')
      end

      def parsed_albums_page
        @parsed_albums_page ||=
          Nokogiri::HTML.parse(albums_page_response)
      end

      def total_count
        parsed_albums_page.css(
          '.pagination-page'
        ).last.text.strip.to_i * 20
      end
    end
  end
end
