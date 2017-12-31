module Lastfm
  module LovedTracks
    class Updater < Service
      def call
        broadcast_import_start
        import_tracks
      end

    private

      def import_tracks
        page = 1
        loop do
          break unless tracks(page).each do |t|
            track = Lastfm::LovedTracks::TrackProcessor.call(
              profile_id: context.profile_id, track: t
            )
            break unless track.persisted?
          end
          page += 1
        end
      end

      def broadcast_import_start
        ActionCable.server.broadcast(
          "tracks_import_#{@profile.id}",
          id: @profile.id, p: 4
        )
      end

      def tracks(page)
        JSON.parse(link(page))['lovedtracks']['track']
      end

      def link(page)
        RestClient.get(
          'http://ws.audioscrobbler.com/2.0/'\
          '?method=user.getlovedtracks'\
          "&user=#{@profile.lastfm_id}"\
          "&page=#{page}&limit=200"\
          "&api_key=#{ENV['LASTFM_KEY']}&format=json"
        ).body
      end
    end
  end
end
