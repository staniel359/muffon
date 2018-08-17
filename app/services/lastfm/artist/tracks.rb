module LastFM
  class Artist
    class Tracks < LastFM::Base
      def call
        retrieve_tracks
      end

    private

      def retrieve_tracks
        {
          total_count: total_count,
          data:        process_tracks
        }
      end

      def process_tracks
        matched_tracks.sort_by { |t| t[:lastfm_plays_count] }.reverse
      end

      def matched_tracks
        limited_tracks.map { |t| match_track(t) }
      end

      def limited_tracks
        tracks_data[:web].first(@args.limit || 50)
      end

      def tracks_data
        @tracks_data ||= process_tracks_data
      end

      def process_tracks_data
        threads = []
        tracks_data_hash = %w[Web API].each_with_object({}) do |s, h|
          threads << Thread.new do
            h.merge!(s.downcase.to_sym => call_service(s))
          end
        end
        concurrent_loader { threads.each(&:join) }
        tracks_data_hash
      end

      def call_service(service)
        "LastFM::Artist::Tracks::#{service}".constantize.call(
          artist_name: @args.artist_name
        )
      end

      def match_track(title)
        matched_track = matched_track(title)
        {
          title:                  title,
          artist:                 artist_data(matched_track),
          lastfm_listeners_count: matched_track[:lastfm_listeners_count],
          lastfm_plays_count:     matched_track[:lastfm_plays_count],
          mbid:                   matched_track[:mbid]
        }
      end

      def matched_track(title)
        tracks_data[:api][:data].find { |t| t[:title].casecmp(title).zero? }
      end

      def artist_data(track)
        {
          name: track[:artist][:name],
          mbid: track[:artist][:mbid]
        }
      end

      def total_count
        tracks_data[:api][:total_count]
      end
    end
  end
end
