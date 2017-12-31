module Lastfm
  module LovedTracks
    class Processor < Importer
      def call
        process_tracks
      end

    private

      def process_tracks
        tracks['track'].each { |track| process_track(track) }
      end

      def tracks
        @tracks ||= JSON.parse(link)['lovedtracks']
      end

      def link
        RestClient.get(
          'http://ws.audioscrobbler.com/2.0/'\
          '?method=user.getlovedtracks'\
          "&user=#{@profile.lastfm_id}&limit=200"\
          "&page=#{@args.page}"\
          "&api_key=#{ENV['LASTFM_KEY']}&format=json"
        ).body
      end

      def process_track(track)
        Lastfm::LovedTracks::TrackProcessor.call(
          profile_id: @profile.id,
          track: track
        )

        broadcast_current_count
      end

      def broadcast_current_count
        ActionCable.server.broadcast(
          "tracks_import_#{@profile.id}",
          id: @args.profile_id, p: 4,
          c: @redis.incr("#{@profile.id}:tracks_current_count"),
          t: @args.tracks_total_count
        )
      end
    end
  end
end
