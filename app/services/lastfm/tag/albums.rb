module LastFM
  class Tag
    class Albums < LastFM::Base
      def call
        retrieve_albums_data
      end

    private

      def retrieve_albums_data
        return [] unless @args.tag_name.present?

        {
          data:        process_albums,
          total_count: total_count
        }
      end

      def process_albums
        albums_list.map { |a| process_album(a) }
      end

      def albums_list
        parsed_albums_page.css('.album-grid-item')
      end

      def parsed_albums_page
        @parsed_albums_page ||=
          Nokogiri::HTML.parse(albums_page_response)
      end

      def albums_page_response
        RestClient.get("#{tag_page_link}/albums?page=#{page}")
      end

      def process_album(album)
        {
          title:                  title(album),
          artist:                 { name: artist(album) },
          cover:                  cover(album),
          lastfm_listeners_count: listeners(album)
        }
      end

      def title(album)
        album.css('.album-grid-item-title').css('a').text
      end

      def artist(album)
        album.css('.album-grid-item-artist').css('a').text
      end

      def cover(album)
        album.css('img.cover-art').attr('src').value
      end

      def listeners(album)
        album.css(
          '.album-grid-item-aux-text'
        )[0].text.scan(/\d/).join.to_i
      end

      def total_count
        parsed_albums_page.css(
          '.pagination-page'
        ).last.text.strip.to_i * 20
      end
    end
  end
end
