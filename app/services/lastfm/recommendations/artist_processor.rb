module Lastfm
  module Recommendations
    class ArtistProcessor < ArtistsProcessor
      def call
        process_recommendations
      end

    private

      def process_recommendations
        similar_artists.each do |similar_artist|
          process_similar_artist(similar_artist)
        end

        broadcast_current_count unless @args.status == 'no_broadcast'
      end

      def similar_artists
        JSON.parse(link)['similarartists']['artist']
      end

      def link
        RestClient.get(
          'http://ws.audioscrobbler.com/2.0/'\
          '?method=artist.getsimilar'\
          "&artist=#{CGI.escape(artist_name)}&limit=50"\
          "&api_key=#{ENV['LASTFM_KEY']}&format=json"
        ).body
      end

      def artist_name
        ProfileArtist.find(@args.profile_artist_id).artist.name
      end

      def process_similar_artist(similar_artist)
        Lastfm::Recommendations::Processor.call(
          similar_artist: similar_artist,
          profile_id: @profile.id,
          profile_artist_id: @args.profile_artist_id
        )
      end

      def broadcast_current_count
        ActionCable.server.broadcast(
          "tracks_import_#{@profile.id}",
          id: @profile.id, p: 3,
          c: @redis.incr("#{@profile.id}:artists_current_count"),
          t: profile_artists_count
        )
      end
    end
  end
end
