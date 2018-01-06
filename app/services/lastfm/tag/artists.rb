module Lastfm
  module Tag
    class Artists < Service
      def call
        process_tag_artists
      end

    private

      def process_tag_artists
        artists_array.map { |a| process_artist(a) }
      end

      def artists_array
        Nokogiri::HTML.parse(
          RestClient.get(
            "https://www.last.fm/tag/#{query_name(@args.name)}"\
            "/artists?page=#{@args.page || 1}"
          )
        ).css('.big-artist-list-wrap').css('.link-block-target')
      end

      def process_artist(a)
        artist = ::Artist.find_by(name: a.text)
        return artist if artist.present? && artist&.info_status == 'base'

        Lastfm::Artist::Processor.call(
          name: a.text, type: 'base'
        )
      end
    end
  end
end
