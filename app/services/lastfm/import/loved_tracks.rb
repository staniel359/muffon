module LastFM
  module Import
    class LovedTracks < LastFM::Import::Base
      def call
        process_loved_tracks
      end

    private

      def process_loved_tracks
        reset_counter('loved_tracks')
        set_total_count('loved_tracks', total_count)
        broadcast_import_start('loved_tracks')
        import_loved_tracks
        delete_counter('loved_tracks')
      end

      def total_count
        loved_tracks_data[:total_count]
      end

      def loved_tracks_data
        @loved_tracks_data ||= loved_tracks_page_data(1)
      end

      def loved_tracks_page_data(page)
        LastFM::User::LovedTracks.call(
          lastfm_id: @profile.lastfm_id,
          page:      page
        )
      end

      def import_loved_tracks
        reversed_pages.each { |p| import_loved_tracks_from_page(p) }
      end

      def reversed_pages
        loved_tracks_data[:pages_count].downto(1)
      end

      def import_loved_tracks_from_page(page)
        loved_tracks_from_page(page).each do |t|
          process_loved_track(t)
          broadcast_current_count('loved_tracks')
        end
      end

      def loved_tracks_from_page(page)
        loved_tracks_page_data(page)[:tracks].reverse
      end

      def process_loved_track(track)
        Muffon::Processor::LovedTrack.call(
          profile_id:  @args.profile_id,
          loved_track: track
        )
      end
    end
  end
end
