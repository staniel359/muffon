module LastFM
  class Tag
    class Artists < LastFM::Base
      def call
        retrieve_artists_data
      end

    private

      def retrieve_artists_data
        return [] unless @args.tag_name.present?

        {
          data:        process_artists,
          total_count: total_count
        }
      end

      def process_artists
        artists_list.map { |a| process_artist(a) }
      end

      def artists_list
        parsed_artists_page.css('.big-artist-list-item')
      end

      def parsed_artists_page
        @parsed_artists_page ||=
          Nokogiri::HTML.parse(artists_page_response)
      end

      def artists_page_response
        RestClient.get("#{tag_page_link}/artists?page=#{page}")
      end

      def process_artist(artist)
        {
          name:                   artist(artist),
          image:                  image(artist),
          lastfm_listeners_count: listeners(artist)
        }
      end

      def artist(artist)
        artist.css('.link-block-target').text
      end

      def image(artist)
        artist.css('img').attr('src').value
      end

      def listeners(artist)
        artist.css('.big-artist-list-listeners').text.scan(/\d/).join.to_i
      end

      def total_count
        parsed_artists_page.css(
          '.pagination-page'
        ).last.text.strip.to_i * 21
      end
    end
  end
end
