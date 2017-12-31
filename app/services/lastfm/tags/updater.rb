module Lastfm
  module Tags
    class Updater < Service
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
        tags.each { |tag| process_tag(tag) }
      end

      def process_tag(tag)
        Lastfm::Tags::Processor.call(
          tag: tag, profile_id: @profile.id
        )
      end
    end
  end
end
