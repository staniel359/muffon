module Lastfm
  module Search
    class Albums < Service
      def call
        search_albums
      end

    private

      def search_albums
        albums.sort_by { |a| a['listeners'].to_i }.reverse.reject do |a|
          a['name'] == '(null)'
        end.map do |a|
          ::Album.where(
            title: a['name'],
            artist_id: ::Artist.where(
              name: a['artist']
            ).first_or_create.id
          ).first_or_initialize.tap do |h|
            h.cover = nil || a['image'][3]['#text']
            h.mbid = a['mbid']
            h.save
          end
        end
      end

      def albums
        JSON.parse(
          RestClient.get(
            'http://ws.audioscrobbler.com/2.0/'\
            "?method=album.search&album=#{query_name(@args.q)}"\
            "&limit=#{@args.limit}&api_key=#{ENV['LASTFM_KEY']}&format=json"
          )
        )['results']['albummatches']['album']
      end
    end
  end
end
