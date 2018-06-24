module Profiles
  module Library
    class ArtistsController < ApplicationController
      def index
        @page_data = {
          title:   title,
          artists: paginate(artists, 20)
        }
      end

      def show
        @page_data = {
          title:  title,
          artist: artist,
          tracks: tracks,
          albums: albums,
          plays:  plays
        }
      end

      def create
        add_artist_to_library
        respond_with_js
      end

    private

      def title
        t(
          "profiles.library.artists.#{params[:action]}",
          profile: profile.nickname,
          artist:  artist.artist_name
        )
      end

      def artist
        @artist ||= profile_artists.find_by(
          'LOWER(artists.name) = ?',
          params[:artist_name].downcase
        )
      end

      def profile_artists
        profile.profile_artists.joins(:artist)
      end

      def artists
        profile.profile_artists.includes(:artist).created_desc
      end

      def tracks
        artist.profile_tracks.includes(:track).created_desc
      end

      def albums
        artist.profile_albums.includes(:album).created_desc
      end

      def plays
        artist.plays.includes(
          profile_track: :track,
          profile_album: :album
        ).created_desc
      end

      def add_artist_to_library
        @profile_artist = current_profile.profile_artists.create(
          artist_id: params[:artist_id]
        )
        process_profile_artist_recommendations
      end

      def process_profile_artist_recommendations
        ArtistRecommendationsProcessorWorker.perform_async(
          @profile_artist.id, current_profile.id
        )
      end
    end
  end
end
