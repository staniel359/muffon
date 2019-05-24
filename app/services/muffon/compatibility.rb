module Muffon
  class Compatibility < Muffon::Base
    def call
      process_compatibility
    end

  private

    def process_compatibility
      {
        artists: artists,
        albums: albums,
        tracks: tracks,
        percent: percent
      }
    end

    def artists
      other_profile.profile_artists.associated.where(
        artist_id: artist_ids
      ).decorate.sort_by { |a| artist_ids.index(a.artist_id) }
    end

    def other_profile
      @other_profile ||= Profile.find_by(id: @args.other_profile_id)
    end

    def artist_ids
      @artist_ids ||= artists_data.group_by { |a| a[1] }.sort_by do |a|
        a[1].transpose[2].sort.inject { |f, s| (f + s) * f.fdiv(s) }
      end.reverse.map(&:first)
    end

    def artists_data
      profile_artists.pluck(:profile_id, :artist_id, :plays_count)
    end

    def profile_artists
      ProfileArtist.joins(:artist).where(
        artist_id: current_profile.artist_ids & other_profile.artist_ids
      )
    end

    def current_profile
      @current_profile ||= Profile.find_by(id: @args.current_profile_id)
    end

    def albums
      other_profile.profile_albums.associated.where(
        album_id: album_ids
      ).decorate.sort_by { |a| album_ids.index(a.album_id) }
    end

    def album_ids
      @album_ids ||= albums_data.group_by { |a| a[1] }.sort_by do |a|
        a[1].transpose[2].sort.inject { |f, s| (f + s) * f.fdiv(s) }
      end.reverse.map(&:first)
    end

    def albums_data
      profile_albums.pluck(:profile_id, :album_id, :plays_count)
    end

    def profile_albums
      ProfileAlbum.joins(:album).where(
        album_id: current_profile.album_ids & other_profile.album_ids
      )
    end

    def tracks
      other_profile.profile_tracks.associated.where(
        track_id: track_ids
      ).decorate.sort_by { |a| track_ids.index(a.track_id) }
    end

    def track_ids
      @track_ids ||= tracks_data.group_by { |a| a[1] }.sort_by do |a|
        a[1].transpose[2].sort.inject { |f, s| (f + s) * f.fdiv(s) }
      end.reverse.map(&:first)
    end

    def tracks_data
      profile_tracks.pluck(:profile_id, :track_id, :plays_count)
    end

    def profile_tracks
      ProfileTrack.joins(:track).where(
        track_id: current_profile.track_ids & other_profile.track_ids
      )
    end

    def percent
      ([
        artists_percentage, albums_percentage, tracks_percentage
      ].sum / 3).round
    end

    def artists_percentage
      (artists.length * 100).fdiv(
        (
          other_profile.artists_count + current_profile.artists_count
        ) / 2
      )
    end

    def albums_percentage
      (albums.length * 100).fdiv(
        (
          other_profile.albums_count + current_profile.albums_count
        ) / 2
      )
    end

    def tracks_percentage
      (tracks.length * 100).fdiv(
        (
          other_profile.tracks_count + current_profile.tracks_count
        ) / 2
      )
    end
  end
end
