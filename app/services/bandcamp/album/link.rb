module Bandcamp
  module Album
    class Link < Service
      def call
        process_album_link
      end

    private

      def process_album_link
        return '' unless album_link.present?

        album_link.match(
          /#{Regexp.quote(primary_domain[1])}\/album\/
            #{Regexp.quote(album_title)}(\-\w+)*/ix
        )[0]
      end

      def album_link
        return unless primary_domain.present?

        google_links.find do |l|
          l.match(
            /#{Regexp.quote(primary_domain[1])}\/album\/
              #{Regexp.quote(album_title)}/ix
          )
        end
      end

      def primary_domain
        return unless google_links.present?

        google_links.first.match(/https:\/\/(\w+\.bandcamp.com)/)
      end

      def google_links
        Nokogiri::HTML.parse(google_page).css('.g').map do |link|
          link.css('a').first['href']
        end
      end

      def google_page
        @google_page ||= RestClient.get(
          'https://www.google.com/search'\
          "?q=#{query_name(@args.artist_name)}+"\
          "#{query_name(@args.album_title)}+bandcamp"
        )
      rescue RestClient::ServiceUnavailable
        retry
      end

      def album_title
        @args.album_title.gsub(' ', '-').gsub('&', '-')
      end
    end
  end
end
