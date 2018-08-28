module Profiles
  module Library
    class TaggingsController < ApplicationController
      before_action :set_profile
      before_action :set_profile_tag, except: :index
      before_action :set_title

      def index
        @pagy, @profile_tags = pagy(profile_tags)
      end

      def show
        @taggings = taggings
      end

      def artists
        @pagy, @taggings = pagy(artist_taggings)
      end

      def albums
        @pagy, @taggings = pagy(album_taggings)
      end

      def tracks
        @pagy, @taggings = pagy(track_taggings)
      end

    private

      def set_title
        @title = t(
          "profiles.library.taggings.#{params[:action]}",
          profile: @profile.nickname,
          tagging: @profile_tag&.tag&.name
        )
      end

      def set_profile_tag
        @profile_tag = @profile.profile_tags.joins(:tag).find_by(
          'LOWER(tags.name) = ?', params[:tag_name].downcase
        )
      end

      def profile_tags
        @profile.profile_tags.includes(:tag).taggings_count_desc
      end

      def taggings
        {
          artists: artist_taggings.first(5),
          albums:  album_taggings.first(5),
          tracks:  track_taggings.first(5)
        }
      end

      def artist_taggings
        @profile_tag.artist_taggings.includes(:taggable).created_desc
      end

      def album_taggings
        @profile_tag.album_taggings.includes(:taggable).created_desc
      end

      def track_taggings
        @profile_tag.track_taggings.includes(:taggable).created_desc
      end
    end
  end
end
