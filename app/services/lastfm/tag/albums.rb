module LastFM
  class Tag
    class Albums < LastFM::Base
      def call
        albums_data
      end

    private

      def albums_data
        return empty_hash unless
            @args.tag_name.present? && albums_page_response.present?

        {
          tag: { name: tag_name },
          albums: albums_data_hash,
          total_count: total_count
        }
      end

      def empty_hash
        { tag: { name: @args.tag_name }, albums: {}, total_count: 0 }
      end

      def albums_page_response
        @albums_page_response ||=
          RestClient.get("#{tag_page_link}/albums?page=#{page}")
      rescue RestClient::NotFound
        nil
      end

      def tag_name
        parsed_page.css('.header-title a').text
      end

      def parsed_page
        @parsed_page ||=
          Nokogiri::HTML.parse(albums_page_response)
      end

      def albums_data_hash
        LastFM::Albums.call(
          album_titles: albums_full_titles.first(@args.limit || 20)
        )
      end

      def albums_full_titles
        [album_titles, album_artists].transpose
      end

      def album_titles
        albums_list.css(
          '.album-grid-item-artist'
        ).css('a').map(&:text)
      end

      def albums_list
        parsed_page.css('.album-grid-item')
      end

      def album_artists
        albums_list.css(
          '.album-grid-item-title'
        ).css('a').map(&:text)
      end

      def total_count
        parsed_page.css(
          '.pagination-page'
        ).last.text.strip.to_i * 20
      end
    end
  end
end
