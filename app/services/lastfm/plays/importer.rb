module Lastfm
  module Plays
    class Importer < Service
      def call
        import_plays
      end

    private

      def import_plays
        @redis.set("#{@profile.id}:plays_current_count", 0)
        broadcast_import_start

        pages_count.downto(1) { |page| process_plays(page) }
        @redis.del("#{@profile.id}:plays_current_count")
      end

      def broadcast_import_start
        ActionCable.server.broadcast(
          "tracks_import_#{@profile.id}",
          id: @profile.id, p: 1
        )
      end

      def pages_count
        plays_json['@attr']['totalPages'].to_i
      end

      def plays_json
        @plays_json ||= JSON.parse(link)['recenttracks']
      end

      def link
        RestClient.get(
          'http://ws.audioscrobbler.com/2.0/'\
          '?method=user.getrecenttracks'\
          "&user=#{@profile.lastfm_id}&limit=200"\
          "&api_key=#{ENV['LASTFM_KEY']}&format=json"
        ).body
      end

      def process_plays(page)
        Lastfm::Plays::Processor.call(
          page: page,
          profile_id: @profile.id,
          plays_count: plays_count
        )
      end

      def plays_count
        @plays_count ||= plays_json['@attr']['total'].to_f
      end
    end
  end
end
