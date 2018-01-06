module Lastfm
  module Tag
    class Tracks < Service
      def call
        process_tag_tracks
      end

    private

      def process_tag_tracks
        tracks_array.map { |a| process_track(a) }
      end

      def tracks_array
        Nokogiri::HTML.parse(
          RestClient.get(
            "https://www.last.fm/tag/#{query_name(@args.name)}"\
            "/tracks?page=#{@args.page || 1}"
          )
        ).css('.chartlist-name')
      end

      def process_track(a)
        ::Track.where(
          title: a.css('.link-block-target').text,
          artist_id: artist(a).id
        ).first_or_create
      end

      def artist(a)
        ::Artist.where(
          name: a.css('.chartlist-artists').css('a').text
        ).first_or_create
      end
    end
  end
end
