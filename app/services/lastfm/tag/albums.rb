module Lastfm
  module Tag
    class Albums < Service
      def call
        process_tag_albums
      end

    private

      def process_tag_albums
        albums_array.map { |a| process_album(a) }
      end

      def albums_array
        Nokogiri::HTML.parse(
          RestClient.get(
            "https://www.last.fm/tag/#{query_name(@args.name)}"\
            "/albums?page=#{@args.page || 1}"
          )
        ).css('.album-grid-item-wrap')
      end

      def process_album(a)
        ::Album.where(
          title: a.css('.album-grid-item-title').css('a').text,
          artist_id: artist(a).id
        ).first_or_initialize.tap do |h|
          h.cover = a.css('img.cover-art').attr('src')
          h.listeners = a.css(
            '.album-grid-item-aux-text'
          )[0].text.scan(/\d/).join('').to_i
          h.save
        end
      end

      def artist(a)
        ::Artist.where(
          name: a.css('.album-grid-item-artist').css('a').text
        ).first_or_create
      end
    end
  end
end
