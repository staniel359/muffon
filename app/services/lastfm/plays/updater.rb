module Lastfm
  module Plays
    class Updater < Service
      attr_accessor :plays_current_count

      def plays_current_count
        @plays_current_count = 0
      end

      def call
        import_plays
      end

    private

      def import_plays
        broadcast_import_start

        page = 1
        loop do
          break unless plays(page).each do |p|
            break unless process_play(p).persisted?
          end
          page += 1
        end
      end

      def broadcast_import_start
        ActionCable.server.broadcast(
          "tracks_import_#{@profile.id}",
          id: @profile.id, p: 1
        )
      end

      def plays(page)
        JSON.parse(link(page))['recenttracks']['track']
      end

      def link(page)
        RestClient.get(
          'http://ws.audioscrobbler.com/2.0/'\
          '?method=user.getrecenttracks'\
          "&user=#{@profile.lastfm_id}&limit=200"\
          "&page=#{page}&extended=1"\
          "&api_key=#{ENV['LASTFM_KEY']}&format=json"
        ).body
      end

      def process_play(play)
        Lastfm::Plays::PlayProcessor.call(
          play: play, profile_id: @profile.id
        )
      end
    end
  end
end
