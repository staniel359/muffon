module Profiles
  module Library
    class TaggingsController < ApplicationController
      before_action :set_profile
      before_action :set_profile_tag, :set_title, except: :index

      def index
        set_profile_tags
        set_title
      end

      def show
        set_artist_taggings
        set_album_taggings
        set_track_taggings
      end

      def artists
        set_artist_taggings
      end

      def albums
        set_album_taggings
      end

      def tracks
        set_track_taggings
      end

    private

      def set_profile_tags
        @profile_tags = paginate(
          @profile.profile_tags.associated.taggings_count_desc, 20
        )
      end

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

      def set_artist_taggings
        @artist_taggings = paginate(
          @profile_tag.artist_taggings.associated.created_desc, 20
        )
      end

      def set_album_taggings
        @album_taggings = paginate(
          @profile_tag.album_taggings.associated.created_desc, 20
        )
      end

      def set_track_taggings
        @track_taggings = paginate(
          @profile_tag.track_taggings.associated.created_desc, 20
        )
      end
    end
  end
end
