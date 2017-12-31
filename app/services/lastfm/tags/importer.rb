module Lastfm
  module Tags
    class Importer < Service
      def call
        import_tags unless tags.blank?
      end

    private

      def tags
        @tags ||= JSON.parse(link)['toptags']['tag']
      end

      def link
        RestClient.get(
          'http://ws.audioscrobbler.com/2.0/'\
          '?method=user.gettoptags&limit=1000'\
          "&user=#{@profile.lastfm_id}"\
          "&api_key=#{ENV['LASTFM_KEY']}&format=json"
        ).body
      end

      def import_tags
        @redis.set("#{@profile.id}:tags_current_count", 0)
        broadcast_import_start

        tags.each { |tag| process_tag(tag) }
        @redis.del("#{@profile.id}:tags_current_count")
      end

      def broadcast_import_start
        ActionCable.server.broadcast(
          "tracks_import_#{@profile.id}",
          id: @profile.id, p: 2
        )
      end

      def process_tag(tag)
        Lastfm::Tags::Processor.call(
          tag: tag, profile_id: @profile.id
        )

        broadcast_current_count
      end

      def broadcast_current_count
        ActionCable.server.broadcast(
          "tracks_import_#{@profile.id}",
          id: @profile.id, p: 2,
          c: @redis.incr("#{@profile.id}:tags_current_count"),
          t: tags.length.to_f
        )
      end
    end
  end
end
