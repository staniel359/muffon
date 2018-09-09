module Profiles
  module Library
    class TagsController < ApplicationController
      before_action :set_profile

      def index
        set_tags
        set_title
      end

      def show
        set_tag
        set_title
        set_artists
      end

    private

      def set_tags
        @tags = ::Library::ArtistTags.call(
          profile_id: @profile.id
        )
      end

      def set_title
        @title = t(
          "profiles.library.tags.#{params[:action]}",
          profile: @profile.nickname,
          tag:     @tag&.name
        )
      end

      def set_tag
        @tag = Tag.with(name: params[:tag_name]).first_or_create
      end

      def set_artists
        @artists = paginate(retrieve_artists, 20)
      end

      def retrieve_artists
        @artists = @profile.profile_artists.joins(
          'JOIN "artists" ON "artists"."id" = "profile_artists"."artist_id"'
        ).where(
          "#{@tag.id} = ANY(artists.tag_ids)"
        ).associated.created_asc
      end
    end
  end
end
