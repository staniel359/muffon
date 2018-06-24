module Profiles
  module Library
    class TagsController < ApplicationController
      def index
        @page_data = {
          title: title,
          tags:  tags
        }
      end

      def show
        @page_data = {
          title:   title,
          tag:     tag,
          artists: paginate(tag.artists, 20)
        }
      end

    private

      def title
        t(
          "profiles.library.tags.#{params[:action]}",
          profile: profile.nickname,
          tag:     tag&.tag&.name
        )
      end

      def tags
        Library::ArtistTags.call(profile_id: profile.id)
      end

      def tag
        @tag ||= Tag.find_by(
          'LOWER(name) = ?', params[:tag_name].downcase
        )
      end
    end
  end
end
