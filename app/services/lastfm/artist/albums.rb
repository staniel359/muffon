module Lastfm
  module Artist
    class Albums < Service
      def call
        process_albums
      end

    private

      def process_albums
        albums.reject { |a| a['name'] == '(null)' }.sort_by do |album|
          album['playcount'].to_i
        end.reverse.map { |a| process_album(a) }
      end

      def albums
        JSON.parse(
          RestClient.get(
            'http://ws.audioscrobbler.com/2.0/'\
            '?method=artist.gettopalbums'\
            "&artist=#{query_name(@args.name)}"\
            "&limit=#{@args.limit}&page=#{page}"\
            "&api_key=#{ENV['LASTFM_KEY']}&format=json"
          ).body
        )['topalbums']['album']
      end

      def process_album(a)
        ::Album.where(
          title: a['name'],
          artist_id: ::Artist.find_by(name: a['artist']['name'])
        ).first_or_initialize.tap do |h|
          h.playcount = a['playcount']
          h.mbid = a['mbid']
          h.cover = nil || a['image'][3]['#text']
          h.save
        end
      end
    end
  end
end
