module LastFM
  module Import
    class Plays < LastFM::Import::Base
      def call
        process_plays
      end

    private

      def process_plays
        reset_counter('plays')
        set_total_count('plays', total_count)
        broadcast_import_start('plays')
        import_plays
        delete_counter('plays')
      end

      def total_count
        plays_data[:total_count]
      end

      def plays_data
        @plays_data ||= plays_page_data(1)
      end

      def plays_page_data(page)
        LastFM::User::Plays.call(
          lastfm_id: @profile.lastfm_id,
          page: page
        )
      rescue RestClient::BadGateway, RestClient::InternalServerError
        retry
      end

      def import_plays
        reversed_pages.each { |p| import_plays_from_page(p) }
      end

      def reversed_pages
        1.downto(1)
      end

      def import_plays_from_page(page)
        plays_from_page(page).each do |p|
          process_play(p)
          broadcast_current_count('plays')
        end
      end

      def plays_from_page(page)
        plays_page_data(page)[:plays].reverse
      end

      def process_play(play)
        Muffon::Processor::Play.call(
          profile_id: @args.profile_id,
          play: play
        )
      end
    end
  end
end
