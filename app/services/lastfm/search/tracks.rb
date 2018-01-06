module Lastfm
  module Search
    class Tracks < Service
      def call
        search_tracks
      end

    private

      def search_tracks
        tracks.sort_by { |t| t['listeners'].to_i }.reverse.map do |t|
          ::Track.where(
            title: t['name'],
            artist_id: ::Artist.where(
              name: t['artist']
            ).first_or_create.id
          ).first_or_initialize.tap do |h|
            h.listeners = t['listeners']
            h.mbid = t['mbid']
            h.save
          end
        end
      end

      def tracks
        JSON.parse(
          RestClient.get(
            'http://ws.audioscrobbler.com/2.0/'\
            "?method=track.search&track=#{query_name(@args.q)}"\
            "&limit=#{@args.limit}&api_key=#{ENV['LASTFM_KEY']}&format=json"
          )
        )['results']['trackmatches']['track']
      end
    end
  end
end
