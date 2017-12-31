module Lastfm
  module Plays
    class Processor < Importer
      def call
        process_plays
      end

    private

      def process_plays
        plays_json['track'].reverse.each do |play|
          Lastfm::Plays::PlayProcessor.call(
            play: play, profile_id: @profile.id
          )

          broadcast_current_count
        end
      end

      def link
        RestClient.get(
          'http://ws.audioscrobbler.com/2.0/'\
          '?method=user.getrecenttracks&'\
          "user=#{@profile.lastfm_id}&extended=1"\
          "&limit=200&page=#{@args.page}"\
          "&api_key=#{ENV['LASTFM_KEY']}&format=json"
        ).body
      end

      def broadcast_current_count
        ActionCable.server.broadcast(
          "tracks_import_#{@profile.id}",
          id: @profile.id, p: 1,
          c: @redis.incr("#{@profile.id}:plays_current_count"),
          t: @args.plays_count
        )
      end
    end
  end
end
