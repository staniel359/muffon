module Muffon
  module Processor
    class Recommendations < Muffon::Processor::Base
      def call
        process_recommendations
      end

    private

      def process_recommendations
        return unless profile_artist.present?

        recommendations.each { |a| process_artist(a) }
      end

      def profile_artist
        @profile_artist ||= ::ProfileArtist.find_by(
          id: @args.profile_artist_id
        )
      end

      def recommendations
        retrieve_recommendations
      rescue NETWORK_ERRORS
        retry
      end

      def retrieve_recommendations
        # LastFM::Artist::SimilarArtists::List.call(
        #   artist_name: profile_artist.artist.name,
        #   limit: 50
        # )[:artists]
        artists = []
        (1..5).each do |page|
          artists += Nokogiri::HTML.parse(
            RestClient.get(
              'https://www.last.fm/music/'\
                "#{CGI.escape(profile_artist.artist.name)}"\
                "/+similar?page=#{page}"
            )
          ).css('.similar-artists-item-name').map(&:text).map(&:strip)
        end
        artists
      end

      def process_artist(name)
        Muffon::Processor::Recommendation.call(
          @args.to_h.merge(artist_name: name)
        )
      end
    end
  end
end
