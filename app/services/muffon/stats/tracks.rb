module Muffon
  module Stats
    class Tracks < Muffon::Stats::Base
      def call
        super
      end

    private

      def retrieve_data
        scope.nil? ? all_tracks : scoped_tracks
      end

      def all_tracks
        @profile.profile_tracks.includes(
          :track, :artist
        ).plays_count_desc.first(TRACKS_LIMIT).map do |t|
          format_track_no_scope(t)
        end
      end

      def format_track_no_scope(track)
        [
          "#{track.artist.name} - #{track.track.title}",
          track.plays_count
        ]
      end

      def scoped_tracks
        limited_track_ids.map do |t|
          format_track_from_scope(t)
        end
      end

      def limited_track_ids
        @limited_track_ids ||=
          grouped_sorted_tracks.first(TRACKS_LIMIT)
      end

      def grouped_sorted_tracks
        plays.pluck(:track_id).group_by(
          &:itself
        ).sort_by { |_, v| v.length }.reverse
      end

      def plays
        @profile.plays.where(
          'created_at between ? and ?',
          start_date, end_date
        )
      end

      def format_track_from_scope(track)
        find_track = track(track[0])
        artist_name = artist(find_track.artist_id).name
        track_title = find_track.title
        ["#{artist_name} - #{track_title}", track[1].length]
      end

      def track(track_id)
        tracks.find { |t| t.id == track_id }
      end

      def tracks
        @tracks ||= Track.find(limited_track_ids)
      end

      def artist(artist_id)
        artists.find { |a| a.id == artist_id }
      end

      def artists
        @artists ||= Artist.find(tracks.pluck(:artist_id))
      end
    end
  end
end
