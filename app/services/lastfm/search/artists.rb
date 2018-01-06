module Lastfm
  module Search
    class Artists < Service
      def call
        search_artists
      end

    private

      def search_artists
        artists.sort_by { |a| a['listeners'].to_i }.reverse.map do |a|
          ::Artist.where(name: a['name']).first_or_initialize.tap do |h|
            h.listeners = a['listeners']
            h.mbid = a['mbid']
            h.image = nil || a['image'][3]['#text']
            h.save
          end
        end
      end

      def artists
        JSON.parse(
          RestClient.get(
            'http://ws.audioscrobbler.com/2.0/'\
            "?method=artist.search&artist=#{query_name(@args.q)}"\
            "&limit=#{@args.limit}&api_key=#{ENV['LASTFM_KEY']}&format=json"
          )
        )['results']['artistmatches']['artist']
      end
    end
  end
end
