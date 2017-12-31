module Lastfm
  module LovedTracks
    class Importer < Service
      def call
        import_tracks
      end

    private

      def import_tracks
        @redis.set("#{@profile.id}:tracks_current_count", 0)
        broadcast_import_start

        pages_count.downto(1) { |page| process_tracks(page) }
        @redis.del("#{@profile.id}:tracks_current_count")
      end

      def broadcast_import_start
        ActionCable.server.broadcast(
          "tracks_import_#{@profile.id}",
          id: @profile.id, p: 4
        )
      end

      def pages_count
        tracks_json['@attr']['totalPages'].to_i
      end

      def tracks_json
        @tracks_json ||= JSON.parse(link)['lovedtracks']
      end

      def link
        RestClient.get(
          'http://ws.audioscrobbler.com/2.0/'\
          '?method=user.getlovedtracks'\
          "&user=#{@profile.lastfm_id}&limit=200"\
          "&api_key=#{ENV['LASTFM_KEY']}&format=json"
        ).body
      end

      def process_tracks(page)
        Lastfm::LovedTracks::Processor.call(
          page: page, profile_id: @profile.id,
          tracks_total_count: tracks_total_count
        )
      end

      def tracks_total_count
        tracks_json['@attr']['total'].to_f
      end
    end
  end
end
