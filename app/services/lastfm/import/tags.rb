module LastFM
  module Import
    class Tags < LastFM::Import::Base
      def call
        process_tags
      end

    private

      def process_tags
        reset_counter('tags')
        set_total_count('tags', total_count)
        broadcast_import_start('tags')
        import_tags
        delete_counter('tags')
      end

      def total_count
        tags.length
      end

      def tags
        @tags ||= LastFM::User::Tags.call(
          lastfm_id: @profile.lastfm_id
        )
      end

      def import_tags
        tags.each do |t|
          process_tag(t)
          broadcast_current_count('tags')
        end
      end

      def process_tag(tag)
        Muffon::Processor::ProfileTag.call(
          profile_id: @args.profile_id,
          tag_name: tag
        )
      end
    end
  end
end
