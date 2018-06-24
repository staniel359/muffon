module Profiles
  module Library
    class TaggingsController < ApplicationController
      def index
        @page_data = {
          title:        title,
          profile_tags: paginate(profile_tags, 20)
        }
      end

      def show
        @page_data = {
          title:       title,
          profile_tag: profile_tag,
          taggings:    taggings
        }
      end

      def artists
        @page_data = {
          taggings: paginate(artist_taggings, 20)
        }
      end

      def albums
        @page_data = {
          taggings: paginate(album_taggings, 20)
        }
      end

      def tracks
        @page_data = {
          taggings: paginate(track_taggings, 20)
        }
      end

    private

      def title
        t(
          "profiles.library.taggings.#{params[:action]}",
          profile: profile.nickname,
          tagging: profile_tag&.tag&.name
        )
      end

      def profile_tags
        profile.profile_tags.includes(:tag).taggings_count_desc
      end

      def profile_tag
        @profile_tag ||= profile.profile_tags.joins(:tag).find_by(
          'LOWER(tags.name) = ?', params[:tag_name].downcase
        )
      end

      def taggings
        {
          artists: artist_taggings,
          albums:  album_taggings,
          tracks:  track_taggings
        }
      end

      def artist_taggings
        profile_tag.artist_taggings.includes(:taggable).created_desc
      end

      def album_taggings
        profile_tag.album_taggings.includes(:taggable).created_desc
      end

      def track_taggings
        profile_tag.track_taggings.includes(:taggable).created_desc
      end
    end
  end
end
